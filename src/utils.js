// Contains Helper Functions

export function displayDialogue(text, onDisplayEnd) {
    const dialogueUI = document.getElementById("textbox-container")

    const dialogue = document.getElementById("dialogue");
    dialogueUI.style.display = "block";
    dialogue.innerHTML = text

    const closeBtn = document.getElementById("close");

    function onCloseBtnClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    closeBtn.addEventListener("click", onCloseBtnClick);

}





