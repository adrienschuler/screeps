require('logging');
var {Utils} = require('utils');
var {Creeps} = require('creeps');
var {Sources} = require('sources');

module.exports.loop = () => {
    var ROOM = 'E45S2';
    var SPAWN = 'Spawn1';

    Sources = new Sources(ROOM);
    Creeps = new Creeps(SPAWN, Sources);

    Utils.clear(Creeps);
}
