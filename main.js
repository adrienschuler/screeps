require('logging');
const {Utils} = require('utils');
const {Creeps} = require('creeps');
const {Sources} = require('sources');

module.exports.loop = () => {
    var ROOM = 'E45S2';
    var SPAWN = 'Spawn1';

    Sources.init(ROOM);

    Creeps.spawn(SPAWN);
    Creeps.run(Sources);
    Creeps.recycle();

    Utils.clear(Creeps);
}
