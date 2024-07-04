module.exports.Utils = {
    clear: (creeps) => {
        utils.clearMemory();
        utils.clearSources(creeps);
    },

    clearMemory: () => {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                debug('Clearing non-existing creep memory:', name);
            }
        }
    },

    clearSources: (creeps) => {
        if (Math.random() < 0.9) {
            creepSources = creeps.getSources();
            for (let creepSource in creepSources) {
                if (creepSource !== undefined) {
                    Memory.sources[creepSource] = creepSources[creepSource];
                }
            }
        }
    }
}
