var utils = require('utils');
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function() {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if (utils.getCreepsByRole('harvester').length < 2) {
        utils.spawnCreep('harvester');
    }

    if (utils.getCreepsByRole('builders').length < 1) {
        utils.spawnCreep('builder');
    }

    if (utils.getCreepsByRole('upgraders').length < 1) {
        utils.spawnCreep('upgrader');
    }

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
