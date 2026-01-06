// Contains Helper Functions

import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";

export function displayDialogue(text, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container")

    const dialogue = document.getElementById("dialogue");
    dialogueUI.style.display = "block";
    dialogue.innerHTML = text 


    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
    

        document.removeEventListener("keydown", onKeyDown);
    }

    function onKeyDown(e) {
        if (e.key === "Escape" || e.key === "e" || e.key === "E") {
            onCloseBtnClick();
        }
    }

    document.addEventListener("keydown", onKeyDown);

}

export function createTooltip(txt, target, width, height) {
    const padding = 10
    const fontSize = 26

    const boxWidth = width
    const boxHeight = height

    // Tooltip container
    const tooltip = k.add([
        k.pos(0, 0),
        k.z(100),
        k.opacity(0),
        "tooltip",
    ])

    
    tooltip.add([
        // Background panel
        k.rect(boxWidth, boxHeight),
        k.color(255, 255, 255), 
        k.opacity(0.95),
        k.outline(2, k.rgb(180, 180, 180)),
    ])

    const label = tooltip.add([
         k.text(txt, {
            size: fontSize,
            width: width,
            align: 'center',
            font: "monogram",
        }),
        k.color(1, 2, 3),
        k.pos(padding, padding),
    ])

    label.pos = k.vec2(
        (boxWidth - label.width) / 2,  // horizontal center
        (boxHeight - label.height) / 2 // vertical center
    )

    tooltip.onUpdate(() => {
        tooltip.pos.x = target.pos.x + 50
        tooltip.pos.y = target.pos.y - height - Math.sin(k.time() * 6) * 1.5
    })

    return tooltip
}








