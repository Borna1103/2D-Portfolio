import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";

k.loadSprite("player", "./Enemies.png" , {
    sliceX: 14,
    sliceY: 24,
    anims: {
        idle : 14,
        run : {from: 28, to: 33, loop: true, speed: 8},
    }
});

k.loadSprite("map", "./map.png");

k.scene("main", async () => {
    const mapData = await (await fetch("./map.json")).json();
    const layers = mapData.layers;

    const map = k.add([
        k.sprite("map"),
        k.pos(),
        k.scale(scaleFactor)
    ])

    const player = k.make([
        k.sprite("player", {anim: "idle"}),
        k.body(),
        k.anchor("center"),
        k.pos(25,200),
        k.scale(scaleFactor),
        {
            speed: 250,
            direction: "right"
        },
        setGravity(1600),
        "player",
    ])

    for (const layer of layers) {
        if (layer.name === "boundaries"){
            for (const boundary of layer.objects) {
                map.add([
                    k.area({
                        shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
                    }),
                    k,body({ isStatic: true}),
                    k.pos(boundary.x, boundary.y),
                    boundary.name
                ])

                if (boundary.name) {
                    player.onCollide(boundary.name, () => {
                        displayDialogue("test");
                    });
                }
            }
            continue;
        }

        if (layer.name == "spawn") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    k.add(player)
                    continue;
                }
            }
        }
    }

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100);
    });

    k.onKeyPressRepeat("w", () => {
        if (player.isGrounded()){
            player.jump();
        }
    });

    k.onKeyPressRepeat("a", () => {
        player.move(LEFT, player.speed);
        player.play("run");
    });

    k.onKeyPressRepeat("d", () => {
        player.move(RIGHT, player.speed);
        player.play("run");
    });
});

k.go("main");