/**
 * Returns a random `number` in the range of `min` and `max` inclusive.
 * @param {number} min The lowerbound number to be included
 * @param {number} max The upperbound number to be included
 */
function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

/**
 * Clears undefined creeps from `Memory`. This occurs when memory has been
 * stored for a creep but the creep has since been removed from the `Game` object.
 */
function clearUndefinedCreepsFromMemory() {
    for (const creepName in Memory.creeps) {
        if (!Game.creeps[creepName]) {
            delete Memory.creeps[creepName];
        }
    }
}

/**
 * Returns `true` if the structure is a `StructureSpawn`.
 * @param {Structure} structure The structure to perform the check on
 * @returns `true` if this structure type is equivalent to the `STRUCTURE_SPAWN` constant
 */
function isSpawnStructure(structure) {
    return structure.structureType === STRUCTURE_SPAWN;
}

module.exports = {
    clearUndefinedCreepsFromMemory,
    isSpawnStructure,
    randomNumberInRange,
}
