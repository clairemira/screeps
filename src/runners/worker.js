const roles = require('roles.roles');

function worker() {
    for (const roleName in roles) {
        const roleInfo = roles[roleName];
        const creeps = _.filter(Game.creeps, (creep) => creep.my && creep.memory.roleName === roleName);
        
        for (const creepName in creeps) {
            const creep = creeps[creepName];
            
            roleInfo.run(creep);
        }
    }
}

module.exports = { run: worker };
