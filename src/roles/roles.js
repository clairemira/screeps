const harvester = require('roles.harvester');
const upgrader = require('roles.upgrader');
const builder = require('roles.builder');

class RoleInfo {
    run;
    minSpawns;
    bodyParts;

    constructor(run, minSpawns, bodyParts) {
        this.run = run;
        this.minSpawns = minSpawns;
        this.bodyParts = bodyParts;
    }
}

const bodyParts = {
    basic: [WORK, CARRY, MOVE],
}

/*
 * Define new roles and options in order of priority here. No need to update any other scripts
 * Minimum spawns means how many are required to be active before the next role will be able to spawn
 */
const roles = {
    harvester: new RoleInfo(harvester, 2, bodyParts.basic),
    upgrader: new RoleInfo(upgrader, 1, bodyParts.basic),
    builder: new RoleInfo(builder, 1, bodyParts.basic),
};

module.exports = roles;
