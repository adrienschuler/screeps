const Utils = {
    clearMemory: () => {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                Log.debug(`Clearing non-existing creep memory: ${name}`);
            }
        }
    },
}

module.exports = Utils;
