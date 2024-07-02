var utils = require('utils');

module.exports.loop = function() {

    utils.clearMemory();

    utils.spawnCreeps();
    utils.runCreeps();
}
