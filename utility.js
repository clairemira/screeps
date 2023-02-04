const constants = require('constants');

function clearUndefinedCreepsFromMemory() {
    for (const creepName in Memory.creeps) {
        if (!Game.creeps[creepName]) {
            delete Memory.creeps[creepName];
        }
    }
}

function isRoomPositionAccessible(creep, pos) {
    const start = { x: pos.x - 1, y: pos.y - 1 };
    const size = 3;
    const areaObjects = creep.room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1);
    let surroundingObstructions = 0;

    for (let y = start.y; y < start.y + size; y++) {
        for (let x = start.x; x < start.x + size; x++) {
            const objects = areaObjects[y][x];

            // Skip this pos if no objects detected or if we're looking at the target position
            if (!objects || (x === pos.x && y === pos.y)) {
                continue;
            }

            // Objects that the creep can't pass through
            const obstructions = _.filter(objects, (obj) => {
                const isOtherCreep = obj.type === constants.CREEP && (creep.pos.x !== obj.creep.pos.x || creep.pos.y !== obj.creep.pos.y);
                const isWall = obj.type === constants.TERRAIN && obj.terrain === constants.WALL;

                return isOtherCreep || isWall;
            });

            surroundingObstructions += obstructions.length > 0 ? 1 : 0;
        }
    }

    return surroundingObstructions < size * size - 1;
}

function harvestClosestEnergySource(creep) {
    const activeEnergySources = creep.room.find(FIND_SOURCES_ACTIVE);

    if (activeEnergySources.length > 0) {
        const sourcesByRange = _.sortBy(activeEnergySources, s => creep.pos.getRangeTo(s));

        for (const index in sourcesByRange) {
            const source = sourcesByRange[index];
            const sourceIsAccessible = isRoomPositionAccessible(creep, source.pos);

            if (sourceIsAccessible) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: constants.VISUALIZE_PATH_STYLE });
                }

                break;
            }
        }
    }
}

function transferResources(creep, resource, structureTypes) {
    const structures = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structureTypes.includes(structure.structureType) && structure.store.getFreeCapacity(resource);
        }
    });

    const prioritisedStructures = _.sortBy(structures, (s) => structureTypes.indexOf(s.structureType));

    for (const structureName in prioritisedStructures) {
        const structure = prioritisedStructures[structureName];
        const freeCapacity = structure.store.getFreeCapacity(resource);

        if (freeCapacity && freeCapacity > 0) {
            if (creep.transfer(structure, resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            return;
        }
    }
}

module.exports = {
    clearUndefinedCreepsFromMemory,
    harvestClosestEnergySource,
    transferResources,
}
