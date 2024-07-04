function createExtensions(room) {
    if (room.controller.level < 2) {
        return;
    }

    let extensions = room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_EXTENSION }
    });

    Log.debug(extensions);

    let spawn = room.find(FIND_MY_SPAWNS)[0];
    let x = spawn.pos.x - 2;
    let y = spawn.pos.y + 1;

    if (extensions.length < 5) {
        for (let i = 0; i < 5; i++) {
            room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
            x += 1;
        }
    }
}

module.exports = createExtensions;
