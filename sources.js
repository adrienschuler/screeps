var sources = {
    init: function(room) {
        Memory.sources = Memory.sources || {};
        for (let source of Game.rooms[room].find(FIND_SOURCES)) {
            if (Memory.sources[source.id] == undefined) {
                Memory.sources[source.id] = 0;
            }
        }
    },

    getAvailableSource: function() {
        let threshold = 7;
        for (let sourceId in Memory.sources) {
            if (sourceId !== undefined) {
                capacity = Memory.sources[sourceId];
                if (capacity < threshold) {
                    console.log("sources.getAvailableSource: " + sourceId + " = " + capacity);
                    Memory.sources[sourceId] += 1;
                    return sourceId;
                }
            }
        }
    },

    harvest: function(creep) {
        if (creep.memory.sourceId == undefined) {
            creep.memory.sourceId = sources.getAvailableSource();
        }
        var source = Game.getObjectById(creep.memory.sourceId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

module.exports = sources;
