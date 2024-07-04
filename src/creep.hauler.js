var hauler = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            var closestDroppedEnergy = creep.pos.findClosestByRange(droppedEnergy);
            if (creep.pickup(closestDroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestDroppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
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
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler' && creep.room.name == room.name);
        // Log.debug('haulers: ' + haulers.length, room.name);

        if (haulers.length < 4) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Hauler' + Game.time;
        let body = [CARRY, MOVE, CARRY, MOVE];
        let memory = {role: 'hauler'};

        return {name, body, memory};
    }
};

module.exports = hauler;
