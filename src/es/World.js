import Vector2D from "./Vector";
import Player from "./Player";
import Platform from "./Platform";
import {isOnGroundEl, playerVelY, playerVelX, playerPosY, playerPosX} from './index';
import Enemy from "./Enemy";

export default class World {
    constructor(width, height, canvasWidth, canvasHeight, debug) {
        this.debug = debug,
        this.width = width,
        this.height = height,
        this.position = new Vector2D(0, 0),
        this.canvasWidth = canvasWidth,
        this.canvasHeight = canvasHeight,
        this.gravity = 1,
        this.platforms = [
            new Platform(this.width, 50, 0, this.height - 50),
            new Platform(300, 50, 0, this.height - 100),
            new Platform(300, 50, this.width - 300, this.height - 100),
            new Platform(300, 50, 400, 350)
        ],
        this.player = new Player(),
        this.actors = [
            this.player,
            this.enemy = new Enemy(500, 0)
        ]
    }

    rangeCollide(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    }

    objectCollide(obj1, obj2) {
        return this.rangeCollide(obj1.left, obj1.right, obj2.left, obj2.right) && this.rangeCollide(obj1.top, obj1.bottom, obj2.top, obj2.bottom);
    }

    getInsersectingPlatforms(actor) {
        let intersectingPlatforms = this.platforms.filter((platform) => {
            if (this.objectCollide(actor, platform)) {return true}
        });

        return intersectingPlatforms;
    }

    playerCollideAll(actor) {
        let inresectingPlatforms = this.getInsersectingPlatforms(actor);

        if (inresectingPlatforms.length > 0) {
            actor.isColliding = true;
        } else {
            actor.isColliding = false;
        }

        inresectingPlatforms.forEach((platform, i) => {
            if (this.objectCollide(actor, platform)) {

                //top
                if (actor.top < platform.bottom  && actor.top > platform.top && actor.left < platform.right && actor.right > platform.left) {
                    actor.velocity.setY(0);
                    actor.position.setY(platform.bottom);
                    // console.log('top')
                }

                //bottom
                if (actor.velocity.y > 0 && actor.bottom >= platform.top && actor.bottom < platform.top + actor.velocity.getY && actor.left < platform.right && actor.right > platform.left) {
                    actor.isOnGround = true;
                    actor.position.setY(platform.top - actor.height);
                    // console.log('bottom');
                }

                //left
                if (actor.left < platform.right && actor.right > platform.right && actor.bottom > platform.top && actor.top < platform.bottom) {
                    actor.velocity.setX(0);
                    actor.position.setX(platform.right + 1);
                    // console.log('left');
                }

                //right
                if (actor.right > platform.left && actor.left < platform.left && actor.bottom > platform.top && actor.top < platform.bottom) {
                    actor.velocity.setX(0);
                    actor.position.setX(platform.left - actor. width - 1);
                    // console.log('right');
                }
            }
        });
    }

    worldBoundriesCollision(actor) {
        // Left
        if (actor.left <= this.position.x) {
            actor.position.setX(0);
        }

        // Right
        if (actor.right >= this.width) {
            actor.position.setX(this.width - actor.width)
        }

        // Bottom
        if (actor.bottom >= this.height) {
            actor.position.setY(this.height - actor.height);
        }
    }


    createSky(ctx) {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    renderPlatforms(ctx) {
        this.platforms.forEach(platform => {
            ctx.fillStyle = platform.color;
            ctx.fillRect(platform.position.getX, platform.position.getY, platform.width, platform.height);
        });
    }

    updateDebugText() {
        isOnGroundEl.innerText = this.player.isOnGround;
        playerVelY.innerText = this.player.velocity.getY;
        playerVelX.innerText = this.player.velocity.getX;
        playerPosY.innerText = this.player.position.getY;
        playerPosX.innerText = this.player.position.getX;
    }

    update() {
        this.actors.forEach(actor => {
            actor.update();
            this.playerCollideAll(actor);
            this.worldBoundriesCollision(actor);
        });
        
        this.updateDebugText();
        // this.platforms[1].setX(this.platforms[1].getX + 1); // move platform

        if (this.debug) {this.gravity = 0}
        this.actors.forEach(actor => {
            if (actor.isColliding && actor.isOnGround) {
                actor.velocity.setY(0);
            } else {
                actor.isOnGround = false;
                actor.velocity.setY(actor.velocity.getY + this.gravity);
            }
        });
    }

    render(ctx) {
        this.createSky(ctx);
        this.renderPlatforms(ctx);
        this.actors.forEach(actor => {
            actor.render(ctx);
        });
    }
}