var roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader')
};

var SPAWN = "Spawn1";

var creeps = {

    findByRole: function(role) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },

    _spawn: function(role) {
        var name = role + Game.time;
        if (Game.spawns[SPAWN].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            console.log('Spawning new ' + role + ': ' + name);
        }
    },

    spawn: function() {
        if (creeps.findByRole('harvester').length < 2) {
            return creeps._spawn('harvester');
        }
        if (creeps.findByRole('upgrader').length < 2) {
            return creeps._spawn('upgrader');
        }
        if (creeps.findByRole('builder').length < 2) {
            return creeps._spawn('builder');
        }
    },

    run: function() {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep);
        }
    },

    recycle: function() {
        for (let creep in Game.creeps) {
            if (creep.ticksToLive < 10) {
                console.log("Recycling " + creep.name);
                Memory.sources[creep.memory.sourceId] -= 1;
                creep.suicide();
            }
        }
    },

    getSources: function() {
        sources = {};
        for (let name in Game.creeps) {
            creep = Game.creeps[name];
            console.log(creep.memory.sourceId);
            sources[creep.memory.sourceId] += 1;
        }
        return sources;
    },
}

module.exports = creeps;
