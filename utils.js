var utils = {
    getCreepsByRole: function(role) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },
    spawnCreep: function(game, role) {
        var name = role + game.time;
        if (game.spawns[SPAWN].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            console.log('Spawning new ' + role + ': ' + name);
        }
    }
}

module.exports = utils;
