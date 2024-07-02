var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if (creep.store.getFreeCapacity() > 0) {

            if (creep.memory.sourceId == undefined) {
                var sources = creep.room.find(FIND_SOURCES);
                for (const source of sources) {
                    if (Memory.sources == undefined || Memory.sources[source.id] == undefined || Memory.sources[source.id] <= 0) {
                        Memory.sources[source.id] = 1;
                        creep.memory.sourceId = source.id;
                        break;
                    } else if (Memory.sources[source.id] < 2) {
                        Memory.sources[source.id] += 1;
                        creep.memory.sourceId = source.id;
                        break;
                    }
                }
            }

            var source = Game.getObjectById(creep.memory.sourceId);

            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;
