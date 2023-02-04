// In order of priority
const structureTypes = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_TOWER,
];

function harvester(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        creep.harvestClosestEnergySource();
    }
    else {
        creep.transferResources(RESOURCE_ENERGY, structureTypes);
    }
}

module.exports = harvester;
