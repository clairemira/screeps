require('creep');

const utility = require('utility');
const spawner = require('spawner');
const worker = require('worker');

module.exports.loop = function () {
    utility.clearUndefinedCreepsFromMemory();

    spawner.run();
    worker.run();
}
