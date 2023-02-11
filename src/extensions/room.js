const constants = require("./constants");

/**
 * Finds an empty room position within the provided rectangle.
 * @param {number} xStart The start x position
 * @param {number} yStart The start y position
 * @param {number} width The width of the rectangle
 * @param {number} height The height of the rectangle
 * @returns {RoomPosition | null} Returns a `RoomPosition` object if an empty one was found, otherwise returns `null`
 */
Room.prototype.findEmptyPositionInRect = function (xStart, yStart, width, height) {
    for (let y = yStart; y < yStart + height; y++) {
        for (let x = xStart; x < xStart + width; x++) {
            const roomPos = this.getPositionAt(x, y);

            if (!roomPos) {
                continue;
            }

            if (roomPos.isClear()) {
                return roomPos;
            }
        }
    }

    return null;
}

// @TODO: This logic is too complex and should get refactored or use some other method of creating extensions.
// This function also doesn't handle if the spiral starts leaving the bounds of the room.
/**
 * Creates extension structures by spiralling out from the first spawn in the room into a 
 * grid with spacing in between each as defined by the `EXTENSION_SPIRAL_SPACING` constant.
 * @returns {RoomPosition | null} A `RoomPosition` object where the construction site for the
 * extension was created, otherwise if it couldn't be created then `null` will be returned
 */
Room.prototype.createExtensionSpiral = function () {
    const spawns = this.find(FIND_MY_SPAWNS);

    if (spawns.length === 0) {
        return null;
    }

    const spawn = spawns[0];
    const moveAmount = constants.EXTENSION_SPIRAL_SPACING;
    const moveCurrent = this.memory.extensionMoveCurrent ? this.memory.extensionMoveCurrent + moveAmount : moveAmount;
    const moveMax = this.memory.extensionMoveMax ? this.memory.extensionMoveMax : moveAmount;

    let x = this.memory.lastExtensionX ? this.memory.lastExtensionX : spawn.pos.x;
    let y = this.memory.lastExtensionY ? this.memory.lastExtensionY : spawn.pos.y;
    let moveDir = this.memory.extensionMoveDir ? this.memory.extensionMoveDir : LEFT;

    if (moveDir === LEFT) {
        x -= moveAmount;
        moveDir = moveCurrent < moveMax ? LEFT : TOP;
    }
    else if (moveDir === TOP) {
        y -= moveAmount;
        moveDir = moveCurrent < moveMax ? TOP : RIGHT;
    }
    else if (moveDir === RIGHT) {
        x += moveAmount;
        moveDir = moveCurrent < moveMax ? RIGHT : BOTTOM;
    }
    else if (moveDir === BOTTOM) {
        y += moveAmount;
        moveDir = moveCurrent < moveMax ? BOTTOM : LEFT;
    }

    // Update memory state
    this.memory.lastExtensionX = x;
    this.memory.lastExtensionY = y;
    this.memory.extensionMoveDir = moveDir;
    this.memory.extensionMoveCurrent = moveCurrent < moveMax ? moveCurrent : 0;
    this.memory.extensionMoveMax =
        moveCurrent === moveMax && ((moveMax > moveAmount && moveDir === LEFT) || moveDir === RIGHT)
            ? moveMax + moveAmount
            : moveMax;

    // Attempt to create extension construction site at this position
    const extensionPos = this.getPositionAt(x, y);

    if (extensionPos &&
        extensionPos.isClear() &&
        this.createConstructionSite(x, y, STRUCTURE_EXTENSION) === OK) {
        return extensionPos;
    }

    return null;
}
