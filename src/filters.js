/*
 * Self explanatory functions that can be passed into filters for convenience
 */

module.exports = {
    structures: {
        extension: function (structure) {
            return structure.structureType === STRUCTURE_EXTENSION;
        },
        spawn: function (structure) {
            return structure.structureType === STRUCTURE_SPAWN;
        },
    }
};
