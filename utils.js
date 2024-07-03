
var utils = {
    clear: function(creeps) {
        utils.clearMemory();
        utils.clearSources(creeps);
    },

    clearMemory: function() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    clearSources: function(creeps) {
        if (Math.random() < 0.9) {
            creepSources = creeps.getSources();
            for (let creepSource in creepSources) {
                if (creepSource != undefined) {
                    Memory.sources[creepSource] = creepSources[creepSource];
                }
            }
        }
    }
}

module.exports = utils;
