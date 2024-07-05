const TOTAL_HARVESTERS = 4;
const HARVESTERS_PER_SOURCE = 2;

const harvester = {

    run: function(creep) {
        if (creep.memory.sourceId == null) {
            let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            let allocatedCapacities = _.countBy(harvesters, 'memory.sourceId');
            let sources = creep.room.find(FIND_SOURCES);

            for (let i = 0; i < sources.length; i++) {
                if (allocatedCapacities[sources[i].id] == undefined || allocatedCapacities[sources[i].id] < HARVESTERS_PER_SOURCE) {
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
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        // Log.debug('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < TOTAL_HARVESTERS) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Harvester' + Game.time;
        let body = [WORK, WORK, MOVE];
        let memory = {role: 'harvester', sourceId: null};

        return {name, body, memory};
    }
};

module.exports = harvester;
