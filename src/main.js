import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import "./sprites.js";
import "./sounds.js";
import Camera from "./camera.js";
import { player, bird, bee } from "./npc.js"
import { setInteractions } from "./interactions.js";



k.scene("main", async () => {
    const mapData = await (await fetch("/map.json")).json();
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
                if (entity.name == "spawnpoint") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    
                }
                else if (entity.name == "projects")
                {
                    bee.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    )

                    map.add([
                        k.area({
                            shape: new k.Rect(k.vec2(0), entity.width, entity.height),
                        }),
                        k.pos(entity.x, entity.y),
                        entity.name
                    ])
                    
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
    
    k.add(player);
    k.add(bird);
    k.add(bee);
    k.wait(0.1, () => {
        player.pos = spawnpoint
    });
    
    
    const birdSpeed = 200
    k.onUpdate(() => {
        // bird
        bird.pos.x -= birdSpeed * k.dt();

        // if bird goes off the left edge, reset to the right
        if (bird.pos.x < -50) { // -50 so it fully leaves the screen
            bird.pos.x = 1600 * scaleFactor + 100;
        }
    });

    
});

k.go("main");