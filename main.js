var utils = require('utils');
var creeps = require('creeps');

module.exports.loop = function() {
    Memory.sources = Memory.sources || {};

    utils.clearMemory();
    creeps.spawn();
    creeps.run();
    creeps.recycle();
}
