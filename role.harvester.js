var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, sources) {
	    if (creep.store.getFreeCapacity() > 0) {
            roleHarvester.harvest(creep, sources);
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
	},

    harvest: function(creep, sources) {
        if (creep.memory.sourceId == undefined) {
            var availableSource = sources.getAvailableSource();
            console.log("role.harvester.harvest() availableSource: " + availableSource.id);
            creep.memory.sourceId = availableSource.id;
        }

        var source = Game.getObjectById(creep.memory.sourceId);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
};

module.exports = roleHarvester;
