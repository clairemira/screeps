const roles = require('roles');

function run() {
    for (const roleName in roles) {
        const roleInfo = roles[roleName];
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.roleName === roleName);
        
        for (const creepName in creeps) {
            const creep = creeps[creepName];
            roleInfo.run(creep);
        }
    }
}

module.exports = { run }
