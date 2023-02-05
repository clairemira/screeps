require('creep');
require('room');
require('room-position');

const utility = require('utility');
const spawner = require('spawner');
const worker = require('worker');
const construction = require('construction');

/** The main run loop called by the Screeps game on each tick */
module.exports.loop = function () {
    utility.clearUndefinedCreepsFromMemory();

    spawner.run();
    construction.run();
    worker.run();
}
