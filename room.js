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

/**
 * Create an extension structure near the spawn.
 * @returns {RoomPosition | null} A `RoomPosition` object where the construction site for the
 * extension was created, otherwise if no valid target could be found then `null` will be returned
 */
Room.prototype.createExtensionNearSpawn = function () {
    const spawns = this.find(FIND_MY_SPAWNS);

    if (spawns.length === 0) {
        return null;
    }

    const spawn = spawns[0];
    const startX = spawn.pos.x - 2;
    const startY = spawn.pos.y + 3;

    // @TODO: This will always attempt to find an empty position in the same
    // rect however the rect location should be dynamic to not cause conflicts
    // once all free spaces have been filled
    const emptyPos = this.findEmptyPositionInRect(startX, startY, 5, 2);

    if (emptyPos && this.createConstructionSite(emptyPos, STRUCTURE_EXTENSION)) {
        return emptyPos;
    }

    return null;
}
