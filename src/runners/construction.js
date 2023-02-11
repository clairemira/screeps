const filters = require('filters');

/**
 * If an enemy creep enters the room then activate safe mode on the room controller immediately.
 * @param {Room} room The room that should be assessed
 */
function activateSafeModeIfNecessary(room) {
    const enemyCreeps = room.find(FIND_HOSTILE_CREEPS);

    if (enemyCreeps.length > 0 && room.controller.safeModeAvailable) {
        room.controller.activateSafeMode();
    }
}

/**
 * Creates an extension in the room if conditions are met.
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
        console.log(room.createExtensionSpiral());
    }
}

/**
 * Creates construction sites and performs other room-related tasks for each room we have access to.
 */
function construction() {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];

        activateSafeModeIfNecessary(room);
        createExtensions(room);
    }
}

module.exports = { run: construction };
