var utils = require('utils');
var creeps = require('creeps');

module.exports.loop = function() {

    utils.clearMemory();

    creeps.spawn();
    creeps.run();
}
