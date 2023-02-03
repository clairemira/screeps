function harvestClosestEnergySource(creep) {
    const activeEnergySources = creep.room.find(FIND_SOURCES_ACTIVE);

    if (activeEnergySources.length > 0) {
        const sourcesByDistance = _.sortBy(activeEnergySources, s => creep.pos.getRangeTo(s));
        const closestSource = sourcesByDistance[0];

        // @TODO: - Check path for source before attempting to harvest/move
        // Currently creeps getting stuck if there is no path available
        if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(closestSource);
        }
    }
}

function transferResources(creep, resource, structureTypes) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structureTypes.includes(structure.structureType) && structure.store.getFreeCapacity(resource);
        }
    });

    const prioritisedStructures = _.sortBy(structures, (s) => structureTypes.indexOf(s.structureType));

    for (const structureName in prioritisedStructures) {
        const structure = prioritisedStructures[structureName];
        const freeCapacity = structure.store.getFreeCapacity(resource);

        if (freeCapacity && freeCapacity > 0) {
            if (creep.transfer(structure, resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            return;
        }
    }
}

module.exports = {
    harvestClosestEnergySource,
    transferResources
}
