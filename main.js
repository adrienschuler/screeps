var utils = require('utils');
var creeps = require('creeps');
var sources = require('sources');

module.exports.loop = function() {
    Memory.sources = Memory.sources || {};

    utils.clearMemory();
    creeps.spawn();
    creeps.run(sources);

    for (const id in Memory.sources) {
        console.log(id);
        if (!Game.getObjectById(id)) {
            console.log("Deleting objectID " + id);
            delete Memory.sources[id];
        }
    }
}
