import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import Camera from "./camera.js"
import { displayDialogue, createTooltip } from "./utils.js";
import { player, bird, bee, slime, fish } from "./npc.js"

export function setInteractions()
{
    var spawnpoint = k.vec2(75,1071);

    let tooltip = new Map()
    var isFlipped = false;

    k.onCollide("player", "void", () => {
        player.pos = spawnpoint;
        Camera.setCameraPosition(k.vec2(window.innerWidth / 2, 1000));
    })

    k.onCollide("player", "welcome", () => {
        tooltip.set("welcome", createTooltip("Welcome to my Platformer Portfolio!! \n Feel Free to Walk Around and Check out the Scenery!", player, 400, 150))
    })

    k.onCollideEnd("player", "welcome", () => {
        tooltip.get("welcome").destroy()
        tooltip.delete("welcome")
    })

    k.onCollide("player", "projects", () => {
        tooltip.set("projects", createTooltip("Here are some projects that I am currently working on!", bee, 400, 150))
    })

    k.onCollideEnd("player", "projects", () => {
        tooltip.get("projects").destroy()
        tooltip.delete("projects")
    });

     k.onCollide("player", "skills", () => {
        tooltip.set("skills", createTooltip("Some things I picked up \n along the way...", slime, 400, 150))
    })

    k.onCollideEnd("player", "skills", () => {
        tooltip.get("skills").destroy()
        tooltip.delete("skills")
    });

    k.onCollide("player", "bird", () => {
        if (tooltip.has("bird")) return;
        tooltip.set("bird", createTooltip("Move out of the way!", bird, 250, 50))
    })

    k.onCollideEnd("player", "bird", () => {
        const temp = tooltip.get("bird")
        if (!temp) return;
        k.wait(2, () => {
            temp.destroy()
            tooltip.delete("bird")
        })
        
    });

    k.onCollide("player", "fish", () => {
        if (tooltip.has("fish")) return;
        tooltip.set("fish", createTooltip("Splash!", fish, 200, 50))
    })

    k.onCollideEnd("player", "fish", () => {
        const temp = tooltip.get("fish")
        if (!temp) return;
        k.wait(2, () => {
            
            temp.destroy()
            tooltip.delete("fish")
        })
        
    });



    k.onCollide("player", "github", () => {
        player.inDialogue = true;
        displayDialogue(`If you want to check some code out you're welcome to peep around my github 🧑‍💻 => <a href="https://github.com/Borna1103" target="_blank">GitHub</a>`, () => (player.inDialogue = false));
    })
    k.onCollide("player", "linkdin", () => {
        player.inDialogue = true;
        displayDialogue(`Add me on my socials! I would love to connect 🙂 => <a href="https://www.linkedin.com/in/borna-hemmaty/" target="_blank">LinkedIn</a>`, () => (player.inDialogue = false));
    })

    k.onCollide("player", "portfolio", () => {
        player.inDialogue = true;
        displayDialogue(`If you want to go check out my other projects without having to jump around, feel free to go check out my web portfolio here 😁 => <a href="https://borna1103.github.io/Borna/" target="_blank">Portfolio</a>`, () => (player.inDialogue = false));
    })

    // Controlls
    k.onKeyPress("space" , () => {
        if (player.isGrounded() && !player.inDialogue) {
            player.jump(800);
        }
    });

    k.onKeyPress("w", () => {
        if (player.isGrounded() && !player.inDialogue){
            player.jump(800);

            k.play("jump", {
                volume: 0.005,
                speed: 2
            });
        }

        
    });

    k.onKeyPress("a", () => {
        if(!player.inDialogue){
            player.play("runRight");
            if(!isFlipped){
                isFlipped = true;
                player.flipX = true;
            }
        }
        
    });

    k.onKeyPress("d", () => {
        if(!player.inDialogue){
            player.play("runLeft");
            if(isFlipped){
                isFlipped = false;
                player.flipX = false;
            }
        }
    })
    k.onKeyDown("a", () => {
        if(!player.inDialogue){
            player.move(-300, 0);
        }
    });

    k.onKeyDown("d", () => {
        if(!player.inDialogue){
            player.move(300, 0);
        }
    });

    k.onKeyPress("r" , () => {
        player.pos = spawnpoint;
        Camera.setCameraPosition(k.vec2(window.innerWidth / 2, 1000));
    });

    k.onKeyRelease("a",() => {
        player.play("idle");
    });

    k.onKeyRelease("d",() => {
        player.play("idle");
    });
}