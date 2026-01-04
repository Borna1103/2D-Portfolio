import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import "./sprites.js";
import "./sounds.js";
import { displayDialogue } from "./utils.js";



k.scene("main", async () => {
    const mapData = await (await fetch("./public/map.json")).json();
    const layers = mapData.layers;
    var spawnpoint = k.vec2(0,0);
    var isFlipped = false;

    // Map Creation
    const map = k.add([
        k.sprite("map"),
        k.pos(0, 0),
        k.scale(scaleFactor),
    ])

    

    // Player Details
    const player = k.make([
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

    const npc = k.make([
        k.sprite("bee", {anim: "idle"}),
        k.pos(0, 1000),
        k.scale(scaleFactor),
        "bee"
    ]) 

    const bird = k.make([
        k.sprite("bird", {anim: "idle"}),
        k.pos(1600 * scaleFactor + 100, 650),
        k.scale(scaleFactor),
        "bird"
    ]) 

    bird.flipX = true;
    npc.flipX = true;

    // const wKey = map.add([
    //     k.sprite("wKey", {anim: "flicker"}),
    //     k.pos(16, 16),
    //     k.scale(0.5),
    //     "wKey",
    // ])

    k.add(bird)
    // Bounderies Set Up
    for (const layer of layers) {
        
        if (layer.name == "boundaries"){
            for (const boundary of layer.objects) {
                
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    k.body({ isStatic: true}),
                    k.pos(boundary.x, boundary.y),
                    boundary.name
                ])  
            }
        }
       
        // Positions Spawn Reletive to the Screen
        else if (layer.name == "interactable") {
            for (const entity of layer.objects) {
                if (entity.name == "spawnpoint") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    spawnpoint = player.pos;
                    k.add(player);
                }
                else if (entity.name == "projects")
                {
                    npc.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    )
                    k.add(npc)
                }
                else{
                    map.add([
                        k.area({
                            shape: new k.Rect(k.vec2(0), entity.width, entity.height),
                        }),
                        k.pos(entity.x, entity.y),
                        entity.name
                    ])  
                }
            }
        }
    }

    
    const birdSpeed = 200
    // Camera Position
    k.onUpdate(() => {

        const mapWidth = 1600 * scaleFactor; 
        const halfScreen = window.innerWidth / 2;
        let targetY = 1000
        let targetX;
        if (player.pos.x <= halfScreen) {
            // Left edge of the map
            targetX = halfScreen
        }
        else if (player.pos.x >= mapWidth - halfScreen) {
            // Right edge of the map
            targetX = mapWidth - halfScreen
        }
        else {
            // Normal follow
            targetX = player.pos.x
        }

        // If camTarget is set (death lerp)
        if(camTarget){
            // Lerp towards camTarget
            let lerpedX = k.lerp(k.camPos().x, camTarget.x, camLerpSpeed);
            let lerpedY = k.lerp(k.camPos().y, camTarget.y, camLerpSpeed);
            k.camPos(lerpedX, lerpedY);

            // Stop lerping when close enough
            if(Math.abs(lerpedX - camTarget.x) < 1 && Math.abs(lerpedY - camTarget.y) < 1){
                camTarget = null; // done lerping
            }

        } else {
            // Normal camera
            k.camPos(targetX, targetY);
        }

        // bird
        bird.pos.x -= birdSpeed * k.dt();

        // if bird goes off the left edge, reset to the right
        if (bird.pos.x < -50) { // -50 so it fully leaves the screen
            bird.pos.x = 1600 * scaleFactor + 100;
        }
    });

    let camTarget = null;
    let camLerpSpeed = 0.2;

    // Interactions 
    k.onCollide("player", "void", () => {
        player.pos = spawnpoint;
        camTarget = k.vec2(window.innerWidth / 2, 1000);
    })

    

    k.onCollide("player", "welcome", () => {
        k.onKeyPress("e", () => {
            player.inDialogue = true;
            displayDialogue("Welcome! This is my personal portfolio! I hope you enjoy it! \n Sincerly, \n Borna Hemmaty", () => (player.inDialogue = false));
        })
    })

    k.onCollide("player", "projects", () => {
        k.onKeyPress("e", () => {
            player.inDialogue = true;
            displayDialogue("This is my first project", () => (player.inDialogue = false));
        })
        
       
    })

    player.onCollideEnd("player", "projects", () => {
        
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
        camTarget = k.vec2(window.innerWidth / 2, 1000);
    });

    k.onKeyRelease("a",() => {
        player.play("idle");
    });

    k.onKeyRelease("d",() => {
        player.play("idle");
    });

   
});

k.go("main");