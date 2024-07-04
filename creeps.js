const roles = {
    harvester: require('role.harvester'),
    builder: require('role.builder'),
    upgrader: require('role.upgrader'),
    hauler: require('role.hauler'),
};

const Creeps = {
    init: (spawn) => {
        Creeps.spawn(spawn);
        Creeps.run();
        Creeps.recycle();
    },

    findByRole: (role) => {
        return _.filter(Game.creeps, (creep) => creep.memory.role == role);
    },

    _spawn: (role, spawn) => {
        var name = role + Game.time;
        if (Game.spawns[spawn].spawnCreep([WORK, CARRY, MOVE], name, {memory: {role: role}}) == 0) {
            Log.debug(`Spawning new ${role} : ${name}`);
        }
    },

    spawn: (spawn) => {
        if (Creeps.findByRole('harvester').length < 4) {
            return Creeps._spawn('harvester', spawn);
        }
        // if (Creeps.findByRole('hauler').length < 4) {
        //     return Creeps._spawn('hauler', spawn);
        // }
        if (Creeps.findByRole('upgrader').length < 4) {
            return Creeps._spawn('upgrader', spawn);
        }
        if (Creeps.findByRole('builder').length < 8) {
            return Creeps._spawn('builder', spawn);
        }
    },

    run: () => {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            roles[creep.memory.role].run(creep);
        }
    },

    recycle: () => {
        // BUG: ticksToLive is undefined
        for (let creep in Game.creeps) {
            if (creep.ticksToLive < 10) {
                Log.debug(`Recycling ${creep.name}`);
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

    clearSources: () => {
        let creepSources = Creeps.getSources();
        for (let creepSource in creepSources) {
            if (creepSource !== undefined) {
                Memory.sources[creepSource] = creepSources[creepSource];
            }
        }
    },

    getAvailableSource: () => {
        let threshold = 7;
        for (let sourceId in Memory.sources) {
            if (sourceId !== undefined) {
                capacity = Memory.sources[sourceId];
                if (capacity < threshold) {
                    Log.debug(`sources.getAvailableSource: ${sourceId} = ${capacity}`);
                    Memory.sources[sourceId] += 1;
                    return sourceId;
                }
            }
        }
    },

    harvest: (creep) => {
        // if (creep.memory.role == "builder" || creep.memory.role == "upgrader") {
        //     const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
        //         filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
        //                        i.store[RESOURCE_ENERGY] > 0
        //     });
        //     container = containersWithEnergy[0].id;
        //     creep.memory.sourceId = container;

        //     if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }

        // } else if (creep.memory.sourceId == undefined || creep.memory.sourceId == "undefined" ) {
        //     creep.memory.sourceId = Creeps.getAvailableSource();
        // }

        if (creep.memory.sourceId == undefined || creep.memory.sourceId == "undefined" ) {
            creep.memory.sourceId = Creeps.getAvailableSource();
        }

        var source = Game.getObjectById(creep.memory.sourceId);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    },
}

module.exports = Creeps;
