let creepLogic = require('creep.logic');
let creepTypes = _.keys(creepLogic);


function spawnCreeps(room) {
    var creepTypeNeeded = null;
    let currentRoles = _.countBy(Game.creeps, 'memory.role');

    // first spawn the minimum number of creeps for each role
    for (let type of creepTypes) {
        if (currentRoles[type] == undefined || currentRoles[type] < creepLogic[type].MIN) {
            creepTypeNeeded = type;
            break;
        }
    }

    if (!creepTypeNeeded) {
        // then flood creeps until we reach the max number for each role
        for (let type of creepTypes) {
            if (currentRoles[type] == undefined || currentRoles[type] < creepLogic[type].MAX) {
                creepTypeNeeded = type;
                break;
            }
        }
    }

    if (creepTypeNeeded !== null) {
        // get the data for spawning a new creep of creepTypeNeeded
        let creepToSpawn = creepLogic[creepTypeNeeded];

        if (creepToSpawn) {
            // find the first or 0th spawn in the room
            let spawn = room.find(FIND_MY_SPAWNS)[0];
            let result = spawn.spawnCreep(
                creepToSpawn.BODY,
                creepToSpawn.getName(),
                {memory: {'role': creepToSpawn.ROLE}}
            );

            // Log.debug(`Tried to Spawn: ${creepTypeNeeded} ${result}`);
        }
    }

}

module.exports = spawnCreeps;
