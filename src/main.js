global.Log = require('./log');

var Utils = require('utils');
var Creeps = require('creeps');
var Sources = require('sources');

module.exports.loop = () => {
    const ROOM = 'E45S2';
    const SPAWN = 'Spawn1';

    Creeps.init(SPAWN, Sources);

    Utils.clear(Creeps);
}
