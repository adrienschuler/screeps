var Utils = require('utils');
var Creeps = require('creeps');
var Sources = require('sources');

module.exports.loop = () => {
    const ROOM = 'E45S2';
    const SPAWN = 'Spawn1';

    Sources.init(ROOM);
    Creeps.init(SPAWN, Sources);

    Utils.clear(Creeps);
}
