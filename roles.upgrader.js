const utility = require('utility');

function upgrader(creep) {
    if (creep.store.getFreeCapacity() > 0) {
        utility.harvestClosestEnergySource(creep);
    } else {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
            console.log(creep.moveTo(creep.room.controller));
        }
    }
}

module.exports = upgrader;
