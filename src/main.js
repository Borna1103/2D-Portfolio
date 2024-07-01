import { k } from "./kaboomCtx";

k.loadSprite("Character", "./Enemies.png" , {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-left" : {from: 28, to: 33, loop: true, speed: 8},
        "idle-right" : {from: 28, to: 33, loop: true, speed: 8},
    }
});

k.loadSprite("map", "./map.png");