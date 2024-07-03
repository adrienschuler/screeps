```javascript
Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "hauler1", {memory: {role: "hauler"}});
```

```javascript
_.each(Game.creeps, (creep) => creep.suicide());
```

```javascript
var containersWithEnergy = Game.creeps[""].room.find(FIND_STRUCTURES, {
    filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
});
console.log(containersWithEnergy);
```