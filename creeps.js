var roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader')
};

var creeps = {

    findByRole: function(role) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },

    _spawn: function(role, spawn) {
        var name = role + Game.time;
        if (Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            console.log('Spawning new ' + role + ': ' + name);
        }
    },

    spawn: function(spawn) {
        if (creeps.findByRole('harvester').length < 4) {
            return creeps._spawn('harvester', spawn);
        }
        if (creeps.findByRole('upgrader').length < 1) {
            return creeps._spawn('upgrader', spawn);
        }
        if (creeps.findByRole('builder').length < 9) {
            return creeps._spawn('builder', spawn);
        }
    },

    run: function(sources) {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep, sources);
        }
    },

    recycle: function() {
        // BUG: ticksToLive is undefined
        for (let creep in Game.creeps) {
            console.log(creep.ticksToLive);
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
            if (creep.memory.sourceId != undefined) {
                if (sources[creep.memory.sourceId] == undefined) {
                    sources[creep.memory.sourceId] = 0;
                }
                sources[creep.memory.sourceId] += 1;
        }
        return sources;
    },
}

module.exports = creeps;
