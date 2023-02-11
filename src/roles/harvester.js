const constants = require('constants');

function harvester(creep) {
    if (creep.memory.harvesting && creep.store.getFreeCapacity() > 0) {
        creep.harvestClosestEnergySource();
    }

    if (!creep.memory.harvesting && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        // @TODO: Create a command queue so we don't need to nest if statements like this
        if (!creep.transferResources(RESOURCE_ENERGY, constants.PRIORITISED_ENERGY_STRUCTURES)) {
            if (!creep.buildConstructionSite()) {
                creep.moveNearClosestSpawn();
            }
        }
    }

    // State

    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
        creep.memory.harvesting = false;
    }

    if (!creep.memory.harvesting && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        creep.memory.harvesting = true;
    }
}

module.exports = harvester;
