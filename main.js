const spawner = require('spawner');
const worker = require('worker');

module.exports.loop = function () {
    spawner.run();
    worker.run();
}
