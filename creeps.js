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
        if (creeps.findByRole('harvester').length < 6) {
            return creeps._spawn('harvester');
        }
        // if (creeps.findByRole('upgrader').length < 1) {
        //     return creeps._spawn('upgrader');
        // }
        // if (creeps.findByRole('builder').length < 1) {
        //     return creeps._spawn('builder');
        // }
    },

    run: function(_sources) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep, _sources);
        }
    },
}

module.exports = creeps;
