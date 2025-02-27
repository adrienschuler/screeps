function createExtensions(room) {
    if (room.controller.level < 2) {
        return;
    }

    let extensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });

    let spawn = room.find(FIND_MY_SPAWNS)[0];
    let x = spawn.pos.x - 1;
    let y = spawn.pos.y - 2;

    if (extensions.length < 5) {
        for (let i = 0; i < 5; i++) {
            room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
            y += 1;
        }
    }
}

module.exports = createExtensions;
