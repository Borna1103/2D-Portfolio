import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";

k.loadSprite("player", "./Enemies.png" , {
    sliceX: 14,
    sliceY: 24,
    anims: {
        "idle" : 14,
        "run" : {from: 28, to: 33, loop: true, speed: 8},
    }
});

k.loadSprite("map", "./map.png");

k.scene("main", async () => {
    const mapData = await (await fetch("./map.json")).json();
    const layers = mapData.layers;

    // Map Creation
    const map = k.add([
        k.sprite("map"),
        k.pos(0),
        k.scale(scaleFactor),
    ])

    // Player Details
    const player = k.make([
        k.sprite("player", {anim: "idle"}),
        k.body(),
        k.area(),
        k.pos(0,400),
        k.scale(scaleFactor),
        {
            speed: 250,
            direction: "right"
        },
        k.setGravity(600),
        "player",
    ])


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

                if (boundary.name) {
                    player.onCollide(boundary.name, () => {
                        
                    
                    });
                    
                }
            }
            
        }
       
        // Positions Spawn Reletive to the Screen
        else if (layer.name == "spawn") {
            for (const entity of layer.objects) {
                if (entity.name == "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    k.add(player);
                }
            }
        }
    }
    
    // Camera Position
    k.onUpdate(() => {
        k.camPos(player.pos.x + 500, 500);
    });

    // Movement to Player
    k.onKeyPress("space" , () => {
        if (player.isGrounded()) {
            player.jump(400);
        }
    });

    k.onKeyPress("w", () => {
        if (player.isGrounded()){
            player.jump(400);
        }
    });

    k.onKeyPress("a", () => {
        player.play("run");
    });

    k.onKeyPress("d", () => {
        player.play("run");
    })
    k.onKeyDown("a", () => {
        player.move(-300, 0);
    });

    k.onKeyDown("d", () => {
        player.move(300, 0);
    });

    k.onKeyRelease( () => {
        player.play("idle");
    });


    k.onKeyPress("r" , () => {
        k.go("main");
    });
});

k.go("main");