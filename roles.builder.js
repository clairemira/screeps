function builder(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        creep.harvestClosestEnergySource();
    }
}

module.exports = builder;
