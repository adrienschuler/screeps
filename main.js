var utils = require('utils');
var creeps = require('creeps');
var sources = require('sources');

module.exports.loop = function() {
    var ROOM = "E45S2";
    var SPAWN = "Spawn1";

    sources.init(ROOM);

    creeps.spawn(SPAWN);
    creeps.run(sources);
    creeps.recycle();

    utils.clearMemory();
}
