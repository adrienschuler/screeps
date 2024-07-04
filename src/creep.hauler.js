const TOTAL_HAULERS = 2;

var hauler = {

    run: function(creep) {
        if (creep.memory.sourceId == null) {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            droppedEnergy.sort((a, b) => b.amount - a.amount);

            // var closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
            creep.memory.sourceId = droppedEnergy[0].id;
        }

        if (creep.store.getFreeCapacity() > 0) {
            var source = Game.getObjectById(creep.memory.sourceId);

            if (creep.pickup(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            // const spawns = creep.room.find(FIND_MY_SPAWNS);
            // const closestSpawn = creep.pos.findClosestByRange(spawns);

            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });

            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                creep.memory.sourceId = null;
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name == room.name);
        // Log.debug('haulers: ' + haulers.length, room.name);

        if (haulers.length < TOTAL_HAULERS) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Hauler' + Game.time;
        let body = [CARRY, MOVE, CARRY, MOVE];
        let memory = {role: 'hauler', sourceId: null};

        return {name, body, memory};
    }
};

module.exports = hauler;
