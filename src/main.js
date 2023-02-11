require('extensions.creep');
require('extensions.room');
require('extensions.room-position');

const utility = require('utility');
const spawner = require('runners.spawner');
const worker = require('runners.worker');
const construction = require('runners.construction');

/** The main run loop called by the Screeps game on each tick */
module.exports.loop = function () {
    utility.clearUndefinedCreepsFromMemory();

    spawner.run();
    construction.run();
    worker.run();
}
