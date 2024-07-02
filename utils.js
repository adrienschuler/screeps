
var utils = {
    clearMemory: function() {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for (const id in Memory.sources) {
            if (!Game.getObjectById(id)) {
                console.log("Deleting objectID " + id);
                delete Memory.sources[id];
            }
        }
    },
}

module.exports = utils;
