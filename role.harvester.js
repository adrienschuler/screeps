var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, _sources) {
	    if (creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);

            for (source in sources) {
                if (_sources.state[sources[source].id] == undefined) {
                    _sources.state[sources[source].id] = 1;
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.memory.source = source.id;
                        return;
                    }
                } else if (_sources.state[sources[source].id] < 2) {
                    _sources.state[sources[source].id] = _sources.state[sources[source].id] + 1;
                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        creep.memory.source = source.id;
                        return;
                    }
                }
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
