global.Log = require('log');

let creepLogic = require('creep.logic');
let roomLogic = require('room.logic');
let prototypes = require('prototypes.creep');


module.exports.loop = () => {
    // make a list of all of our rooms
    Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);

    // run spwan logic for each room in our empire
    _.forEach(Game.myRooms, r => roomLogic.spawning(r));

    _.forEach(Game.myRooms, r => roomLogic.extensions(r));

    // run each creep role
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        let role = creep.memory.role;
        if (creepLogic[role]) {
            creepLogic[role].run(creep);
        }
    }

    // free up memory if creep no longer exists
    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            Log.debug(`Clearing non-existing creep memory: ${name}`);
        }
    }
}
