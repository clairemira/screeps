const roles = require('roles')

function clearUnusedCreepsFromMemory() {
    for (const creepName in Memory.creeps) {
        if (!Game.creeps[creepName]) {
            delete Memory.creeps[creepName];
        }
    }
}

function nextIdForRole(roleName) {
    if (!Memory.ids) {
        Memory.ids = {};
    }

    const id = Memory.ids[roleName] ? Memory.ids[roleName] + 1 : 1;
    Memory.ids[roleName] = id;
    return id;
}

function run() {
    clearUnusedCreepsFromMemory();
        
    for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];

        if (spawn.spawning) {
            continue;
        }

        for (const roleName in roles) {
            const roleInfo = roles[roleName];
            const creepsForRole = _.filter(Game.creeps, (creep) => creep.memory.roleName === roleName);
            const energyCost = roleInfo.bodyParts.reduce((c, p) => c + BODYPART_COST[p], 0);

            if (creepsForRole.length < roleInfo.minSpawns) {
                // Don't go through other roles if we don't have enough en energy or meet minSpawns requirement for this role
                if (energyCost > spawn.store.getUsedCapacity(RESOURCE_ENERGY)) {
                    break;
                }

                const id = nextIdForRole(roleName);
                const name = `${roleName}_${id}`;
                spawn.spawnCreep(roleInfo.bodyParts, name, { memory: { roleName } });
                break;
            }
        }
    }
}

module.exports = { run }
