var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.sourceId == null) {
            var sources = creep.room.find(FIND_SOURCES);
            creep.memory.sourceId = sources[0].id;

            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            var counts = _.countBy(harvesters, 'memory.sourceId');
            Log.debug(harvesters);
            Log.debug(counts);
        }

        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        Log.debug('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 3) {
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
