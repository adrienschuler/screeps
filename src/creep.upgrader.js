const TOTAL_UPGRADERS = 4;

const upgrader = {

    run: function(creep) {
        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        else if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            let droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
                filter: resource => resource.resourceType == RESOURCE_ENERGY
            });
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.name);
        // Log.debug(`Upgraders: ${upgraders.length} ${room.name}`);

        if (upgraders.length < TOTAL_UPGRADERS) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Upgrader' + Game.time;
        let body = [WORK, CARRY, MOVE];
        let memory = {role: 'upgrader'};

        return {name, body, memory};
    }
};

module.exports = upgrader;
