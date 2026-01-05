import kaboom from "../node_modules/kaboom/dist/kaboom.mjs";

export const k = kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game")
})

await k.loadFont("monogram", "/monogram.ttf");