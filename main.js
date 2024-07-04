require('logging');
const {Utils} = require('utils');
const {Creeps} = require('creeps');
const {Sources} = require('sources');

module.exports.loop = () => {
    const ROOM = 'E45S2';
    const SPAWN = 'Spawn1';

    Sources.init(ROOM);
    Creeps.init(SPAWN, Sources);

    Utils.clear(Creeps);
}
