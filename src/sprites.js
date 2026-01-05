import { k } from "./kaboomCtx.js";



// Map Sprite

k.loadSprite("map",  "public/map.png");
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

// Npc Character Sprite
k.loadSprite("bee", "public/Enemies.png" , { 
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : {from: 252, to: 255, loop: true, speed: 8},
    }
});

k.loadSprite("linkedin", "public/LinkedIn.png")
k.loadSprite("github", "public/Github.png")
k.loadSprite("exclamation", "public/Exclamation.png")

k.loadSprite("slime", "public/Enemies.png", {
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : {from: 168, to: 175, loop: true, speed: 8},
        "walking" : {from: 182, to: 191, loop: true, speed: 8}
    }
})

k.loadSprite("bird","public/Enemies.png", {
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : {from: 308, to: 311, loop: true, speed: 8},
    }
})
