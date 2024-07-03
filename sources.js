var sources = {
    init: function(room) {
        Memory.sources ||= {};
        for (let source of Game.rooms[room].find(FIND_SOURCES)) {
            Memory.sources[source.id] ||= 0;
        }
    },
    getAvailableSource: function() {
        let threshold = 2;
        for (let sourceId in Memory.sources) {
            capacity = Memory.sources[sourceId];
            if (capacity < threshold) {
                console.log("sources.get: " + sourceId + " = " + capacity);
                return sourceId;
            }
        }
    }
}

module.exports = sources;
