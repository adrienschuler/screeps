
var utils = {
    clearMemory: function() {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        for (let id in Memory.sources) {
            if (!Game.getObjectById(id)) {
                console.log("Deleting objectID " + id);
                delete Memory.sources[id];
            }
        }
    },
}

module.exports = utils;
