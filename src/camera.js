import { scaleFactor } from "./constants.js";
import { k } from "./kaboomCtx.js";
import { player } from "./npc.js"


class Camera
{
    
    constructor()
    {
        this.camTarget = null
        this.camLerpSpeed = 0.2
    }

    initializeTracker()
    {
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
            if(this.camTarget){
                // Lerp towards camTarget
                let lerpedX = k.lerp(k.camPos().x, this.camTarget.x, this.camLerpSpeed);
                let lerpedY = k.lerp(k.camPos().y, this.camTarget.y, this.camLerpSpeed);
                k.camPos(lerpedX, lerpedY);
    
                // Stop lerping when close enough
                if(Math.abs(lerpedX - this.camTarget.x) < 1 && Math.abs(lerpedY - this.camTarget.y) < 1){
                    this.camTarget = null; // done lerping
                }
    
            } else {
                // Normal camera
                k.camPos(targetX, targetY);
            }
        })
    }

    setCameraPosition(pos)
    {
        this.camTarget = pos
        console.log(pos)
    }
}

export default new Camera();
