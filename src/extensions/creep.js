const constants = require('constants');
const utility = require('utility');

/**
 * Commands the creep to move near the closest spawn structure.
 * Call this when there is nothing else for the creep to do.
 * @param {number} distance The number of tiles away from the spawn. Defaults to `3`.
 */
Creep.prototype.moveNearClosestSpawn = function (distance = 3) {
    const closestSpawn = this.pos.findClosestByRange(FIND_MY_SPAWNS);
    
    if (closestSpawn && !this.pos.inRangeTo(closestSpawn, distance)) {
        this.moveTo(closestSpawn);
    }
}

/**
 * Checks if the target position is accessible by the creep. If all tiles surrounding
 * the target contain obstructions then this function will return false.
 * @param {RoomPosition} pos The room position to check if accessible
 */
Creep.prototype.isRoomPositionAccessible = function (pos) {
    const start = { x: pos.x - 1, y: pos.y - 1 };
    const size = 3;

    for (let y = start.y; y < start.y + size; y++) {
        for (let x = start.x; x < start.x + size; x++) {
            const roomPos = this.room.getPositionAt(x, y);

            // Skip this pos if it's not valid or we're looking at the target position
            if (!roomPos || x === pos.x && y === pos.y) {
                continue;
            }

            if (!roomPos.isObstructed({ ignoreCreep: this })) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Commands the creep to harvest the closest active energy source.
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
                    this.say('*slurp*', true);
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
 * @param {string[]} structureTypes An array of `STRUCTURE_*` constants in order of priority
 * @returns {boolean} `true` if a successful action occurred, otherwise returns `false`
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
            
            return true;
        }
    }

    return false;
}

/**
 * Commands the creep to build a construction site.
 * @returns {boolean} `true` if an action was made towards a construction
 * site, otherwise `false` if no construction site was found
 */
Creep.prototype.buildConstructionSite = function () {
    const constructionSites = this.room.find(FIND_CONSTRUCTION_SITES);

    if (constructionSites.length > 0) {
        const constructionSite = constructionSites[0];

        if (this.build(constructionSite) === ERR_NOT_IN_RANGE) {
            this.moveTo(constructionSite, constants.VISUALIZE_PATH_STYLE);
        }

        return true;
    }

    return false;
}
