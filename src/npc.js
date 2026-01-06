import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import "./sprites.js";

export const player = k.make([
    k.sprite("player", {anim: "idle"}),
    k.body(),
    k.area(),
    k.pos(20, 1000),
    k.z(100),
    k.scale(scaleFactor),
    {
        speed: 250,
        direction: "right",
        inDialogue: false
    },
    k.setGravity(1900),
    "player",
])

export const github = k.make([
    k.sprite("github"),
    k.pos(0,0),
    k.scale(scaleFactor)
])

export const linkedin = k.make([
    k.sprite("linkedin"),
    k.pos(0,0),
    k.scale(scaleFactor)
])


export const bee = k.make([
    k.sprite("bee", {anim: "idle"}),
    k.pos(0, 1000),
    k.scale(scaleFactor),
    "bee"
]) 

export const bird = k.make([
    k.sprite("bird", {anim: "idle"}),
    k.pos(1600 * scaleFactor + 100, 650),
    k.area(),
    k.scale(scaleFactor),
    k.z(99),
    "bird"
]) 

export const exclamationWelcome = k.make([
    k.sprite("exclamation"),
    k.pos(0,0),
    k.scale(scaleFactor)
])

export const exclamationBee= k.make([
    k.sprite("exclamation"),
    k.pos(0,0),
    k.scale(scaleFactor)
])

export const exclamationSlime= k.make([
    k.sprite("exclamation"),
    k.pos(0,0),
    k.scale(scaleFactor)
])

export const slime = k.make([
    k.sprite("slime", {anim: "idle"}),
    k.pos(0,0),
    k.scale(scaleFactor),
    "slime"
])

export const fish = k.make([
    k.sprite("fish", {anim: "idle"}),
    k.pos(408 * scaleFactor, 550 * scaleFactor),
    k.scale(scaleFactor),
    k.area(),
    "fish"
])


export const keys = k.add([
    k.pos(100, 700),
    "controls"
])

let spacing = 40

keys.add([
    k.sprite("W", {anim: "idle"}),
    k.pos(spacing, 0),
    k.scale(2),
])

// A (left)
keys.add([
    k.sprite("A" , {anim: "idle"}),
    k.pos(0, spacing),
    k.scale(2),
])

// S (middle)
keys.add([
    k.sprite("S"),
    k.pos(spacing, spacing),
    k.scale(2),
])

// D (right)
keys.add([
    k.sprite("D", {anim: "idle"}),
    k.pos(spacing * 2, spacing),
    k.scale(2),
])

// keys.add([
//     k.sprite("Space", {anim: "idle"}),
//     k.pos(spacing * 4, spacing * 1),
//     k.scale(2),
//     k.z(2)
// ])

keys.add([
    k.sprite("E", {anim: "idle"}),
    k.pos(spacing * 4, 0),
    k.scale(2),
])

keys.add([
    k.sprite("R", {anim: "idle"}),
    k.pos(spacing * 6, 0),
    k.scale(2),
])

keys.add([
        k.text("Move", { size: 16, align: "center", width: 50 }),
        k.pos(spacing, -spacing), // adjust x/y so it centers nicely
        k.color(255, 255, 255)
    ]);


const birdSpeed = 200

bird.onUpdate(() => {
    bird.pos.x -= birdSpeed * k.dt();
    if (bird.pos.x < -50) { 
        bird.pos.x = 1600 * scaleFactor + 100;
    }
});



fish.onUpdate(() => {
    fish.pos.y = fish.pos.y - Math.sin(k.time()) * 2
    if ( Math.sin(k.time()) > 0.50)
    {
        fish.flipY = false
    }
    else if (Math.sin(k.time()) < -0.3)
    {
        fish.flipY = true
    }
})

github.onUpdate(() => {
    github.pos.y = github.pos.y - Math.sin(k.time() * 6) * 0.05
})

linkedin.onUpdate(() => {
    linkedin.pos.y = linkedin.pos.y + Math.sin(k.time() * 6) * 0.05
})

exclamationWelcome.onUpdate(() => {
    exclamationWelcome.pos.y = exclamationWelcome.pos.y + Math.sin(k.time() * 6) * 0.05
})

exclamationBee.onUpdate(() => {
    exclamationBee.pos.y = exclamationBee.pos.y + Math.sin(k.time() * 6) * 0.05
})

exclamationSlime.onUpdate(() => {
    exclamationSlime.pos.y = exclamationSlime.pos.y + Math.sin(k.time() * 6) * 0.05
})

slime.flipX = true;
bird.flipX = true;
bee.flipX = true;