global.Log = require('./log');
global.SPAWN = 'Spawn1';

var Utils = require('utils');
var Creeps = require('creeps');


module.exports.loop = () => {

    var roles = {};
    for (creep in Game.creeps) {
        if (roles[creep.memory.role] == undefined) {
            roles[creep.memory.role] = 0;
        }
        roles[creep.memory.role] += 1
    }

    Log.debug(roles);

    Utils.clearMemory();
}
