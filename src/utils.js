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
    

        document.removeEventListener("keydown", onKeyDown);
        closeBtn.removeEventListener("click", onCloseBtnClick);
    }

    function onKeyDown(e) {
        if (e.key === "Escape") {
            onCloseBtnClick();
        }
    }

    document.addEventListener("keydown", onKeyDown);
    closeBtn.addEventListener("click", onCloseBtnClick);

}










