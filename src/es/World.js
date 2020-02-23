import Vector2D from "./Vector";
import Player from "./Player";
import Platform from "./Platform";
import {isOnGroundEl, playerVelY, playerVelX, playerPosY, playerPosX} from './index';

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
        this.playerCollision = {
            active: false,
            activePlatformIndex: null,
            top: {
                active: false,
                activePlatformIndex: null
            },
            bottom: {
                active: false,
                activePlatformIndex: null
            },
            left: {
                active: false,
                activePlatformIndex: null
            },
            right: {
                active: false,
                activePlatformIndex: null
            }
        }
    }

    rangeCollide(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    }

    objectCollide(obj1, obj2) {
        return this.rangeCollide(obj1.left, obj1.right, obj2.left, obj2.right) && this.rangeCollide(obj1.top, obj1.bottom, obj2.top, obj2.bottom);
    }

    getInsersectingPlatforms() {
        let intersectingPlatforms = this.platforms.filter((platform) => {
            if (this.objectCollide(this.player, platform)) {return true}
        });

        return intersectingPlatforms;
    }

    playerCollideAll() {
        let inresectingPlatforms = this.getInsersectingPlatforms();

        if (inresectingPlatforms.length > 0) {
            this.playerCollision.active = true;
        } else {
            this.playerCollision.active = false;
        }

        inresectingPlatforms.forEach((platform, i) => {
            if (this.objectCollide(this.player, platform)) {

                //top
                if (this.player.top < platform.bottom  && this.player.top > platform.top && this.player.left < platform.right && this.player.right > platform.left) {
                    this.player.velocity.setY(0);
                    this.player.position.setY(platform.bottom);
                    // console.log('top')
                }

                //bottom
                if (this.player.velocity.y > 0 && this.player.bottom >= platform.top && this.player.bottom < platform.top + this.player.velocity.getY && this.player.left < platform.right && this.player.right > platform.left) {
                    this.player.isOnGround = true;
                    this.player.position.setY(platform.top - this.player.height);
                    // console.log('bottom');
                }

                //left
                if (this.player.left < platform.right && this.player.right > platform.right && this.player.bottom > platform.top && this.player.top < platform.bottom) {
                    this.player.velocity.setX(0);
                    this.player.position.setX(platform.right + 1);
                    // console.log('left');
                }

                //right
                if (this.player.right > platform.left && this.player.left < platform.left && this.player.bottom > platform.top && this.player.top < platform.bottom) {
                    this.player.velocity.setX(0);
                    this.player.position.setX(platform.left - this.player. width - 1);
                    // console.log('right');
                }
            }
        });
    }

    worldBoundriesCollision() {
        // Left
        if (this.player.left <= this.position.x) {
            this.player.position.setX(0);
        }

        // Right
        if (this.player.right >= this.width) {
            this.player.position.setX(this.width - this.player.width)
        }

        // Bottom
        if (this.player.bottom >= this.height) {
            this.player.position.setY(this.height - this.player.height);
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
        this.player.update();
        this.playerCollideAll();
        this.worldBoundriesCollision();
        this.updateDebugText();
        // this.platforms[1].setX(this.platforms[1].getX + 1); // move platform

        if (this.debug) {this.gravity = 0}

        // Gravity
        if (this.playerCollision.active && this.player.isOnGround) {
            this.player.velocity.setY(0);
        } else {
            this.player.isOnGround = false;
            this.player.velocity.setY(this.player.velocity.getY + this.gravity);
        }
    }

    render(ctx) {
        this.createSky(ctx);
        this.renderPlatforms(ctx);
        this.player.render(ctx);
    }
}