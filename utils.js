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
    }
}

module.exports = utils;
