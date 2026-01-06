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
k.loadSprite("logo", "public/Logo.png")

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

k.loadSprite("fish","public/Enemies.png", {
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : {from: 280, to: 285, loop: true, speed: 8},
    }
})

k.loadSprite("W","public/keyboard/W.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 4},
    }
})

k.loadSprite("A","public/keyboard/A.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 4},
    }
})


k.loadSprite("S","public/keyboard/S.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : 0,
    }
})


k.loadSprite("D","public/keyboard/D.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 4},
    }
})

k.loadSprite("E","public/keyboard/E.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 3},
    }
})

k.loadSprite("R","public/keyboard/R.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 2},
    }
})

k.loadSprite("Space","public/keyboard/SPACE.png", {
    sliceX: 3,
    sliceY: 1,
    anims: {
        "idle" : {from: 0, to: 2, loop: true, speed: 4},
    }
})
