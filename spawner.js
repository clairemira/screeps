const constants = require('constants');
const utility = require('utility');
const roles = require('roles');

function spawner() {
    for (const spawnName in Game.spawns) {
        const spawn = Game.spawns[spawnName];

        if (spawn.spawning) {
            spawn.room.visual.text(`Spawning ${spawn.spawning.name}`, spawn.pos.x, spawn.pos.y + 2, constants.DEFAULT_TEXT_STYLE);
            continue;
        }

        for (const roleName in roles) {
            const roleInfo = roles[roleName];
            const creepsForRole = _.filter(Game.creeps, (creep) => creep.my && creep.memory.roleName === roleName);
            const energyCost = roleInfo.bodyParts.reduce((c, p) => c + BODYPART_COST[p], 0);

            if (creepsForRole.length < roleInfo.minSpawns) {
                // Don't go through other roles if we don't have enough en energy or meet minSpawns requirement for this role
                if (energyCost > spawn.store.getUsedCapacity(RESOURCE_ENERGY)) {
                    break;
                }

                const id = utility.getIncrementingId(roleName);
                const name = `${roleName}_${id}`;
                spawn.spawnCreep(roleInfo.bodyParts, name, { memory: { roleName } });
                break;
            }
        }
    }
}

module.exports = { run: spawner };
