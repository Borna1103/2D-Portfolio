import { k } from "./kaboomCtx.js";


// Map Sprite
k.loadSprite("map", "public/map.png");

// WASD Controlls
// k.loadSprite("wKey", "./wasd.png", {
//     sliceX: 12,
//     sliceY: 0,
//     anims: {
//         "flicker" : {from: 1, to: 2, loop: true, speed: 2},
//     }
// })


// Main Character Sprite
k.loadSprite("player", "public/Enemies.png" , {
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : 14,
        "runRight" : {from: 28, to: 33, loop: true, speed: 8},
        "runLeft" : {from: 33, to: 28, loop: true, speed: 8},
    }
});
