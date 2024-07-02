var utils = require('utils');
var creeps = require('creeps');
var sources = require('sources');

module.exports.loop = function() {
    Memory.sources = Memory.sources || {};

    utils.clearMemory();
    creeps.spawn();
    creeps.run(sources);
    creeps.recycle();
}
