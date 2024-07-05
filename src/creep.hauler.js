const TOTAL_HAULERS = 5;

const hauler = {

    run: function(creep) {
        if (creep.memory.sourceId == null) {
            let droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            droppedEnergy.sort((a, b) => b.amount - a.amount);

            // let closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
            creep.memory.sourceId = droppedEnergy[0].id;
        }

        if (creep.store.getFreeCapacity() > 0) {
            let source = Game.getObjectById(creep.memory.sourceId);

            if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            // const spawns = creep.room.find(FIND_MY_SPAWNS);
            // const closestSpawn = creep.pos.findClosestByRange(spawns);

            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN);
                }
            });

            // targets.sort((a, b) => a.store.getFreeCapacity(RESOURCE_ENERGY) - b.store.getFreeCapacity(RESOURCE_ENERGY));

            let transfer = creep.transfer(targets[0], RESOURCE_ENERGY);
            switch (transfer) {
                case 0:
                    break;
                case ERR_NOT_IN_RANGE:
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
                    break;
                case ERR_FULL:
                    creep.drop(RESOURCE_ENERGY);
                    creep.memory.sourceId = null;
                    break;
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        let haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name == room.name);
        // Log.debug('haulers: ' + haulers.length, room.name);

        if (haulers.length < TOTAL_HAULERS) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Hauler' + Game.time;
        let body = [CARRY, MOVE, CARRY, MOVE];
        let memory = {
            role: 'hauler',
            sourceId: null
        };

        return {name, body, memory};
    }
};

module.exports = hauler;
