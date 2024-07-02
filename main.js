var utils = require('utils');
var creeps = require('creeps');
var sources = require('sources');

module.exports.loop = function() {

    utils.clearMemory();
    creeps.spawn();
    creeps.run(sources);
}
