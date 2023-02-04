const constants = require('constants');
const utility = require('utility');

/*

/**
 * Commands the creep to move to a random position near the closest spawn structure.
 * Call this when there is nothing else for the creep to do.
 * @param {number} distance The number of tiles away from the spawn. Defaults to `3`.
 */
Creep.prototype.moveNearClosestSpawn = function (distance = 3) {
    const spawns = this.room.find(FIND_STRUCTURES, { filter: utility.isSpawnStructure });
    const spawnsByRange = _.sortBy(spawns, s => this.pos.getRangeTo(s));
    
    if (spawnsByRange.length > 0) {
        const closestSpawn = spawnsByRange[0];

        if (!this.pos.inRangeTo(closestSpawn, distance)) {
            this.moveTo(closestSpawn);
        }
    }
}

/**
 * Checks if the target position is accessible by the creep. If any tile surrounding
 * the target contains an obstruction then this function will return false.
 * @param {RoomPosition} pos The room position to check if accessible
 */
Creep.prototype.isRoomPositionAccessible = function (pos) {
    const start = { x: pos.x - 1, y: pos.y - 1 };
    const size = 3;
    const areaObjects = this.room.lookAtArea(pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1);
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
                const isOtherCreep = obj.type === constants.CREEP && (this.pos.x !== obj.creep.pos.x || this.pos.y !== obj.creep.pos.y);
                const isWall = obj.type === constants.TERRAIN && obj.terrain === constants.WALL;
            
                return isOtherCreep || isWall;
            });

            surroundingObstructions += obstructions.length > 0 ? 1 : 0;
        }
    }

    return surroundingObstructions < size * size - 1;
}

/**
 * Commands the creep to harvest the closest active energy source.
 * @param {Creep} creep The creep that should perform the harvest
 */
Creep.prototype.harvestClosestEnergySource = function () {
    const activeEnergySources = this.room.find(FIND_SOURCES_ACTIVE);

    if (activeEnergySources.length > 0) {
        const sourcesByRange = _.sortBy(activeEnergySources, s => this.pos.getRangeTo(s));

        for (const index in sourcesByRange) {
            const source = sourcesByRange[index];
            const sourceIsAccessible = this.isRoomPositionAccessible(source.pos);

            if (sourceIsAccessible) {
                const harvestRes = this.harvest(source);

                if (harvestRes === OK && utility.randomNumberInRange(1, 10) === 1) {
                    this.say('*slurp*');
                }

                if (harvestRes === ERR_NOT_IN_RANGE) {
                    this.moveTo(source, { visualizePathStyle: constants.VISUALIZE_PATH_STYLE });
                }

                break;
            }
        }
    }
}

/**
 * Commands the creep to transfer a resource to a structure using a prioritised list of structure types.
 * If the first structure type is not found then it will attempt to transfer to the next one in the list.
 * @param {string} resourceType One of the `RESOURCE_*` constants
 * @param {string[]} structureTypes An array of `RESOURCE_*` constants in order of priority
 */
Creep.prototype.transferResources = function (resourceType, structureTypes) {
    const structures = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return structureTypes.includes(structure.structureType) && structure.store.getFreeCapacity(resourceType);
        }
    });

    const prioritisedStructures = _.sortBy(structures, (s) => structureTypes.indexOf(s.structureType));

    for (const structureName in prioritisedStructures) {
        const structure = prioritisedStructures[structureName];

        if (structure.store.getFreeCapacity(resourceType)) {
            if (this.transfer(structure, resourceType) === ERR_NOT_IN_RANGE) {
                this.moveTo(structure);
            }
            
            return;
        }
    }

    this.moveNearClosestSpawn();
}
