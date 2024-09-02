import kaboom from '../node_modules/kaboom/dist/kaboom';

export const k = kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game")
})