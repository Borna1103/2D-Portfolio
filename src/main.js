import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import "./sprites.js";
import "./sounds.js";
import Camera from "./camera.js";
import { player, bird, bee, github, linkedin, exclamationWelcome, exclamationBee, exclamationSlime, slime, fish, keys, logo, slime2, exit } from "./npc.js"
import { setInteractions } from "./interactions.js";



k.scene("main", async () => {
    const mapData = await (await fetch("public/map.json")).json();
    const layers = mapData.layers;
    var spawnpoint = k.vec2(75,1071);
    Camera.initializeTracker()
    setInteractions()

    // Map Creation
    const map = k.add([
        k.sprite("map"),
        k.pos(0, 0),
        k.scale(scaleFactor),
    ])

    
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

                switch (entity.name) {
                    case "spawnpoint":
                         player.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        );              
                        break;
                    case "projects":
                        bee.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        )
                        
                        exclamationBee.pos = k.vec2(
                            (map.pos.x + entity.x - 2) * scaleFactor,
                            (map.pos.y + entity.y - 13) * scaleFactor
                        )
                        break;
                    case "github":
                        github.pos = k.vec2(
                            (map.pos.x + entity.x + 1) * scaleFactor,
                            (map.pos.y + entity.y - 40) * scaleFactor
                        )
                        break;
                    case "linkedin":
                        linkedin.pos = k.vec2(
                            (map.pos.x + entity.x + 1) * scaleFactor,
                            (map.pos.y + entity.y - 40) * scaleFactor
                        )
                        break;
                    case "welcome":
                        exclamationWelcome.pos = k.vec2(
                            (map.pos.x + entity.x + 2) * scaleFactor,
                            (map.pos.y + entity.y - 15) * scaleFactor
                        )
                        break;
                    case "skills":
                        slime.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y + 1) * scaleFactor
                        );

                        exclamationSlime.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y - 10) * scaleFactor
                        );
                        break;
                    case "portfolio":
                        logo.pos = k.vec2(
                            (map.pos.x + entity.x + 2) * scaleFactor,
                            (map.pos.y + entity.y - 40) * scaleFactor
                        )
                        break;
                    case "experience":
                        slime2.pos = k.vec2(
                            (map.pos.x + entity.x) * scaleFactor,
                            (map.pos.y + entity.y) * scaleFactor
                        )
                        break;
                    case "exit":
                        exit.pos = k.vec2(
                            (map.pos.x + entity.x - 150) * scaleFactor,
                            (map.pos.y + entity.y + 10) * scaleFactor
                        )
                    break;
                    default:

                }

                
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
    
    k.add(player);
    k.add(bird);
    k.add(bee);
    k.add(linkedin);
    k.add(github);
    k.add(exclamationWelcome)
    k.add(exclamationBee)
    k.add(slime)
    k.add(exclamationSlime)
    k.add(fish)
    k.add(keys)
    k.add(logo)
    k.add(slime2)
    k.add(exit)
    
    k.wait(0.1, () => {
        player.pos = spawnpoint
    });
        
});

k.go("main");