module.exports.Sources = class Sources {
    constructor(room) {
        Memory.sources = Memory.sources || {};
        for (let source of Game.rooms[room].find(FIND_SOURCES)) {
            if (Memory.sources[source.id] == undefined) {
                Memory.sources[source.id] = 0;
            }
        }
    }

    getAvailableSource() {
        let threshold = 7;
        for (let sourceId in Memory.sources) {
            if (sourceId !== undefined) {
                capacity = Memory.sources[sourceId];
                if (capacity < threshold) {
                    debug(`sources.getAvailableSource: {sourceId} = {capacity}`);
                    Memory.sources[sourceId] += 1;
                    return sourceId;
                }
            }
        }
    }

    harvest(creep) {
        // if (creep.memory.role == 'builder' || creep.memory.role == 'upgrader') {
        //     const containersWithEnergy = creep.room.find(FIND_STRUCTURES, {
        //         filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
        //                        i.store[RESOURCE_ENERGY] > 0
        //     });
        //     container = containersWithEnergy[0].id;
        //     creep.memory.sourceId = container;

        //     if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }

        // } else if (creep.memory.sourceId == undefined || creep.memory.sourceId == 'undefined' ) {
        //     creep.memory.sourceId = this.getAvailableSource();
        // }

        if (creep.memory.sourceId == undefined || creep.memory.sourceId == 'undefined' ) {
            creep.memory.sourceId = this.getAvailableSource();
        }

        var source = Game.getObjectById(creep.memory.sourceId);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
