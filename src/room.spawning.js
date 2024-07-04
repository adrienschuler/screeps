let creepLogic = require('creep.logic');
let creepTypes = _.keys(creepLogic);

function spawnCreeps(room) {

    // lists all the creep types to console
    // _.forEach(creepTypes, type => Log.debug(type));

    // find a creep type that returns true for the .spawn() function
    let creepTypeNeeded = _.find(creepTypes, function(type) {
        return creepLogic[type].spawn(room);
    });

    // get the data for spawning a new creep of creepTypeNeeded
    let creepSpawnData = creepLogic[creepTypeNeeded] && creepLogic[creepTypeNeeded].spawnData(room);
    // Log.debug(room, creepSpawnData);

    if (creepSpawnData) {
        // find the first or 0th spawn in the room
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let result = spawn.spawnCreep(creepSpawnData.body, creepSpawnData.name, {memory: creepSpawnData.memory});

        // Log.debug(`Tried to Spawn: ${creepTypeNeeded} ${result}`);
    }
}

module.exports = spawnCreeps;
