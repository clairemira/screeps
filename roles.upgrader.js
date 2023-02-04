function upgrader(creep) {
    const needToUpgrade = creep.memory.harvesting && creep.store.getFreeCapacity() === 0;
    const needToHarvest = !creep.memory.harvesting && creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0;

    if (needToUpgrade) {
        creep.memory.harvesting = false;
    }

    if (!creep.memory.harvesting && creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
    }

    if (creep.memory.harvesting || needToHarvest) {
        creep.memory.harvesting = true;
        creep.harvestClosestEnergySource();
    }
}

module.exports = upgrader;
