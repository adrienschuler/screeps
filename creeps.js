const roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader'),
    hauler: require('role.hauler'),
};

module.exports.Creeps = {
    findByRole: (role) => {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },

    _spawn: (role, spawn) => {
        var name = role + Game.time;
        if (Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            debug('Spawning new ' + role + ': ' + name);
        }
    },

    spawn: (spawn) => {
        if (Creeps.findByRole('harvester').length < 4) {
            return creeps._spawn('harvester', spawn);
        }
        // if (Creeps.findByRole('hauler').length < 4) {
        //     return Creeps._spawn('hauler', spawn);
        // }
        if (Creeps.findByRole('upgrader').length < 4) {
            return creeps._spawn('upgrader', spawn);
        }
        if (Creeps.findByRole('builder').length < 8) {
            return creeps._spawn('builder', spawn);
        }
    },

    run: (sources) => {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep, sources);
        }
    },

    recycle: () => {
        // BUG: ticksToLive is undefined
        for (let creep in Game.creeps) {
            if (creep.ticksToLive < 10) {
                debug(`Recycling {creep.name}`);
                Memory.sources[creep.memory.sourceId] -= 1;
                creep.suicide();
            }
        }
    },

    getSources: () => {
        sources = {};
        for (let name in Game.creeps) {
            creep = Game.creeps[name];
            if (creep.memory.sourceId !== undefined) {
                if (sources[creep.memory.sourceId] == undefined) {
                    sources[creep.memory.sourceId] = 0;
                }
                sources[creep.memory.sourceId] += 1;
            }
        }
        return sources;
    },
}
