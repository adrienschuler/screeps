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
        let threshold = 3;
        for (let sourceId in Memory.sources) {
            capacity = Memory.sources[sourceId];
            if (capacity < threshold) {
                console.log("sources.getAvailableSource: " + sourceId + " = " + capacity);
                return sourceId;
            }
        }
    }
}

module.exports = sources;
