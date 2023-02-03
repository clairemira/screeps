const utility = require('utility')

function builder(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        utility.harvestClosestEnergySource(creep);
    }
}

module.exports = builder;
