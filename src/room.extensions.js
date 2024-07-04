function createExtensions(room) {
    if (room.controller.level < 2) {
        return;
    }

    let extensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });

    if (extensions.length < 5) {
        let spawn = room.find(FIND_MY_SPAWNS)[0];
        let pos = spawn.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);

        if (pos) {
            room.createConstructionSite(pos, STRUCTURE_EXTENSION);
        }
    }
}

module.exports = createExtensions;
