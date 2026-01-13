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

export function createTooltip(pages, target, width, height) {
    const padding = 10
    const fontSize = 24
    let pageIndex = 0

    let imageObj = null
    let linkText = null

    const tooltip = k.add([
        k.pos(0, 0),
        k.z(100),
        "tooltip",
        {
            nextPage() {
               
                if (pageIndex < pages.length - 1) {
                    pageIndex++
                    render()
                }
            },
            prevPage() {
                if (pageIndex > 0) {
                    pageIndex--
                    render()
                }
            },
        }
    ])

    // Background
    tooltip.add([
        k.rect(width, height),
        k.color(255, 255, 255),
        k.opacity(0.95),
        k.outline(2, k.rgb(180, 180, 180)),
    ])

    const label = tooltip.add([
        k.text("", {
            size: fontSize,
            width: width - padding * 2,
            align: "center",
            font: "monogram",
        }),
        k.color(20, 20, 20),
        k.pos(padding, padding),
    ])

    function clearExtras() {
        imageObj?.destroy()
        linkText?.destroy()
        imageObj = null
        linkText = null
    }

    function render() {
        clearExtras()

        const page = pages[pageIndex]

        label.text = page.text ?? ""

        label.pos = k.vec2(
            (width - label.width) / 2,
            padding
        )

        let currentY = label.pos.y + label.height + 10

        // 🖼 Image
        if (page.image) {
            imageObj = tooltip.add([
                k.sprite(page.image),
                k.pos((width / 2), currentY),
                k.anchor("top"),
                k.scale(0.2),
            ])

            currentY += imageObj.height + 8
        }

        // 🔗 Link
        if (page.link) {
            linkText = tooltip.add([
                k.rect(width, height),
                k.opacity(0),
                k.pos(0,0),
                k.area(),
             
                "tooltipLink",
            ])

            linkText.onClick(() => {
                window.open(page.link, "_blank")
            })
        }
    }

    render()

    tooltip.onUpdate(() => {
        tooltip.pos.x = target.pos.x + 50
        tooltip.pos.y =
            target.pos.y - height - Math.sin(k.time() * 6) * 1.5
    })

    tooltip.onKeyPress("e", () => tooltip.nextPage())
    tooltip.onKeyPress("q", () => tooltip.prevPage())
    

    return tooltip
}








