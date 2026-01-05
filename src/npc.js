import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import "./sprites.js";

export const player = k.make([
    k.sprite("player", {anim: "idle"}),
    k.body(),
    k.area(),
    k.pos(20, 1000),
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

export const slime = k.make([
    k.sprite("slime", {anim: "idle"}),
    k.pos(0,0),
    k.scale(scaleFactor),
    k.area(),
    "slime"
])



const birdSpeed = 200

bird.onUpdate(() => {
    bird.pos.x -= birdSpeed * k.dt();
    if (bird.pos.x < -50) { 
        bird.pos.x = 1600 * scaleFactor + 100;
    }
});

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

bird.flipX = true;
bee.flipX = true;