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

const birdSpeed = 200

bird.onUpdate(() => {
    bird.pos.x -= birdSpeed * k.dt();
    if (bird.pos.x < -50) { 
        bird.pos.x = 1600 * scaleFactor + 100;
    }
});

bird.flipX = true;
bee.flipX = true;