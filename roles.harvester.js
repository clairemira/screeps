const utility = require('utility');

// In order of priority
const structureTypes = [
    STRUCTURE_SPAWN,
    STRUCTURE_EXTENSION,
    STRUCTURE_TOWER,
];

function harvester(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        utility.harvestClosestEnergySource(creep);
    }
    else {
        utility.transferResources(creep, RESOURCE_ENERGY, structureTypes);
    }
}

module.exports = harvester;
