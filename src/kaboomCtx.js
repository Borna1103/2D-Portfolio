import {kaboom} from "../node_modules/kaboom";

export const k = kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game")
})