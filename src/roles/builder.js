const constants = require('constants');

function builder(creep) {
    if (creep.memory.building && creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.buildConstructionSite()) {
            return;
        }
    }

    if (!creep.memory.building && creep.store.getFreeCapacity() > 0) {
        creep.harvestClosestEnergySource();
    }

    if (creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.moveNearClosestSpawn();
    }

    // Update state below after actions

    if (creep.memory.building && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
        creep.memory.building = false;
    }

    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
        creep.memory.building = true;
    }
}

module.exports = builder;
