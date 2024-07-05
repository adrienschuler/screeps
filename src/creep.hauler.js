const hauler = {
    ROLE: 'hauler',
    BODY: [CARRY, MOVE, CARRY, MOVE],
    MIN: 2,
    MAX: 8,

    getName: function() { return `${this.ROLE}-${Game.time}` },

    run: (creep) => {
        // idling, let's find the biggest dropped energy to haul from
        if (creep.memory.sourceId == null) {
            let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            droppedEnergy.sort((a, b) => b.amount - a.amount);

            // let closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
            creep.memory.sourceId = droppedEnergy[0].id;
        }

        // haul energy from the source until full
        if (creep.store.getFreeCapacity() > 0) {
            let source = Game.getObjectById(creep.memory.sourceId);

            if (source) {
                if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // no more energy to haul
                creep.memory.sourceId = null;
            }
        }
        else {
            // full, let's transfer energy to the closest spawn or extension
            let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                }
            });

            if (target) {
                // transfer energy to the target
                let transfer = creep.transfer(target, RESOURCE_ENERGY);
                switch (transfer) {
                    case 0:
                        break;
                    case ERR_NOT_IN_RANGE:
                        creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } });
                        break;
                    case ERR_FULL:
                        creep.drop(RESOURCE_ENERGY);
                        creep.memory.sourceId = null;
                        break;
                }
            } else {
                // all targets are full, let's drop the energy to the closest spawn
                const spawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
                if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn, { visualizePathStyle: { stroke: '#ffaa00' } });
                } else {
                    creep.drop(RESOURCE_ENERGY);
                    creep.memory.sourceId = null;
                }
            }
        }
    },
};

module.exports = hauler;
