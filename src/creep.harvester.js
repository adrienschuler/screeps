const harvester = {
    ROLE: 'harvester',
    getName: function() { return `${this.ROLE}-${Game.time}` },
    BODY: [WORK, WORK, MOVE],
    MIN: 1,
    MAX: 6,
    MAX_PER_SOURCE: 3,

    // spawnData: function(room) {
    //     let name = 'Harvester' + Game.time;
    //     let body = [WORK, WORK, MOVE];
    //     let memory = {role: 'harvester', sourceId: null};

    //     return {name, body, memory};
    // },

    run: function(creep) {
        if (creep.memory.sourceId == null) {
            let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            let allocatedCapacities = _.countBy(harvesters, 'memory.sourceId');
            let sources = creep.room.find(FIND_SOURCES);

            for (let i = 0; i < sources.length; i++) {
                if (allocatedCapacities[sources[i].id] == undefined || allocatedCapacities[sources[i].id] < this.MAX_PER_SOURCE) {
                    creep.memory.sourceId = sources[i].id;
                    break;
                }
            }
        }

        let source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    },
};

module.exports = harvester;
