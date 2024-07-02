// Contains Helper Functions

export function displayDialogue(text) {
    const dialogueUI = document.getElementById("textbox-container")

    const dialogue = document.getElementById("dialogue");
    dialogueUI.style.display = "block";
    dialogue.innerHTML = text

}