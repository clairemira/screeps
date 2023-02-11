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
 * Gets a new ID that should be freely available to use for the given key. Increments on each call.
 * @param {string} key A unique key that defines what the ID is for, e.g. 'harvesters'
 */
function getIncrementingId(key) {
    if (!Memory.ids) {
        Memory.ids = {};
    }

    const id = Memory.ids[key] ? Memory.ids[key] + 1 : 1;
    Memory.ids[key] = id;

    return id;
}

module.exports = {
    clearUndefinedCreepsFromMemory,
    getIncrementingId,
    randomNumberInRange,
};
