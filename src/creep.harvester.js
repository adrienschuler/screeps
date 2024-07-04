var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        Log.debug('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 1) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
        let name = 'Harvester' + Game.time;
        let body = [WORK, WORK, MOVE];
        let memory = {role: 'harvester'};

        return {name, body, memory};
    }
};

module.exports = harvester;
