var roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader')
};

var SPAWN = "Spawn1";

var utils = {
    getCreepsByRole: function(role) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },

    spawnCreep: function(role) {
        var name = role + Game.time;
        if (Game.spawns[SPAWN].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            console.log('Spawning new ' + role + ': ' + name);
        }
    },

    clearMemory: function() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    runCreeps: function() {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep);
        }
    },

    spawnCreeps: function() {
        if (utils.getCreepsByRole('harvester').length < 2) {
            return utils.spawnCreep('harvester');
        }
        if (utils.getCreepsByRole('upgrader').length < 1) {
            return utils.spawnCreep('upgrader');
        }
        if (utils.getCreepsByRole('builder').length < 1) {
            return utils.spawnCreep('builder');
        }
    }
}

module.exports = utils;
