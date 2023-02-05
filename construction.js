const filters = require('filters');

/**
 * Creates an extension in the room if conditions are met
 * @param {Room} room The `Room` object to create the extensions in
 */
function createExtensions(room) {
    // Can't build extensions until controller level 2
    if (room.controller.level < 2) {
        return;
    }

    const constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES, { filter: filters.structures.extension });
    const extensionStructures = room.find(FIND_MY_STRUCTURES, { filter: filters.structures.extension })
    const totalExtensions = constructionSites.length + extensionStructures.length;
    const totalAllowedForLevel = CONTROLLER_STRUCTURES.extension[room.controller.level];

    if (totalExtensions < totalAllowedForLevel) {
        room.createExtensionNearSpawn();
    }
}

/**
 * Create construction sites for each room
 */
function construction() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];

        
        room.controller.activateSafeMode(); // Will only work for the first room
        createExtensions(room);
    }
}

module.exports = { run: construction };
