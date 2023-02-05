const constants = require('constants');

/**
 * Check if this room position is obstructed by an object.
 * @param {{ ignoreCreep?: Creep }} opts To ignore a specific creep when checking for obstructions
 * @returns {boolean} `true` if this `RoomPosition` is obstructed by an object.
 */
RoomPosition.prototype.isObstructed = function (opts = {}) {
    const objects = this.look();

    // A cheeky little loop so we don't need to know about all of the obstructions as there's a lot.
    // Only allow safe tiles to continue otherwise it means an obstruction was detected.
    for (const id in objects) {
        const object = objects[id];
        const isPlainTerrain = object.type === constants.TERRAIN && object.terrain === constants.PLAIN;
        const isIgnoredCreep = opts.ignoreCreep && object.type === constants.CREEP && object.creep.id !== opts.ignoreCreep.id;

        if (isPlainTerrain || isIgnoredCreep) {
            continue;
        }

        return true;
    }

    return false;
}

/**
 * Used to check if this room position is empty such as when needing to create construction sites.
 * @returns {boolean} `true` if this `RoomPosition` does not contain any obstructions.
 */
RoomPosition.prototype.isClear = function () {
    return !this.isObstructed();
}
