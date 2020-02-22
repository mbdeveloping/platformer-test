import Vector2D from "./Vector";
import Player from "./Player";
import Platform from "./Platform";

export default class World {
    constructor(width, height, canvasWidth, canvasHeight, debug) {
        this.debug = debug,
        this.width = width,
        this.height = height,
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

    playerCollide(r0, r1) {
        return this.rangeCollide(r0.position.x, r0.position.x + r0.width, r1.position.x, r1.position.x + r1.width) &&
                this.rangeCollide(r0.position.y, r0.position.y + r0.height, r1.position.y, r1.position.y + r1.height);
    }

    playerCollideBottom(index) {
        return this.player.bottom >= this.platforms[index].top && this.player.top < this.platforms[index].top;
    }

    playerCollideTop(index) {
        return this.player.top <= this.platforms[index].bottom && this.player.bottom > this.platforms[index].bottom;
    }

    playerCollideLeft(index) {
        return this.player.left <= this.platforms[index].right && this.player.right > this.platforms[index].right && this.player.bottom >= this.platforms[index].bottom;
    }

    playerCollideRight(index) {
        return this.player.right >= this.platforms[index].left && this.player.left < this.platforms[index].left && this.player.bottom >= this.platforms[index].bottom;
    }

    setActiveTop(bool, i) {
        this.playerCollision.top.active = bool;
        this.playerCollision.top.activePlatformIndex = i;
        // console.log('top', i);
    }

    setActiveBottom(bool, i) {
        this.playerCollision.bottom.active = bool;
        this.playerCollision.bottom.activePlatformIndex = i;
        // console.log('bottom', i);
    }

    setActiveLeft(bool, i) {
        this.playerCollision.left.active = bool;
        this.playerCollision.left.activePlatformIndex = i;
    }

    setActiveRight(bool, i) {
        this.playerCollision.right.active = bool;
        this.playerCollision.right.activePlatformIndex = i;
        // console.log('right', i);
    }


    // Checks if player collides with any platform and breaks the loop and returns true when it finds first collision
    playerCollideAll() {
        for (let i = 0; i < this.platforms.length; i++) {

            if (this.playerCollide(this.player, this.platforms[i])) {
                this.playerCollision.active = true;
                this.playerCollision.activePlatformIndex = i;
                break;
            } else {
                this.playerCollision.active = false;
                this.playerCollision.activePlatformIndex = null;
            }
        }
        
        for (let i = 0; i < this.platforms.length; i++) {
            if (this.playerCollide(this.player, this.platforms[i])) {
                this.platforms[i].color = 'brown'; //@todo tt rm
                this.playerCollideBottom(i) ? this.setActiveBottom(true, i) : this.setActiveBottom(false, null);
                this.playerCollideTop(i) ? this.setActiveTop(true, i) : this.setActiveTop(false, null);
                this.playerCollideLeft(i) ? this.setActiveLeft(true, i) : this.setActiveLeft(false, null);
                this.playerCollideRight(i) ? this.setActiveRight(true, i) : this.setActiveRight(false, null);
            } else {
                this.platforms[i].color = 'black'; //@todo tt rm
            }
        }
        
    }

    tt() {
        let arrOfCollidedPlatforms = this.platforms.filter((platform, i) => {
            if (this.playerCollide(this.player, platform)) {
                return true;
            }
        });

        // return arrOfCollidedPlatforms;

        arrOfCollidedPlatforms.forEach((platform, i) => {

        });
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

    update() {
        this.player.update();
        this.playerCollideAll();
        this.tt();

        if (this.debug) {this.gravity = 0}

        // Gravity
        if (this.playerCollision.active) {
            this.player.velocity.setY(0);
        } else {
            this.player.velocity.setY(this.player.velocity.getY + this.gravity);
        }


         // Y position
        // Bottom
        if (this.playerCollision.active && this.playerCollision.bottom.active) {
            this.player.position.setY(this.platforms[this.playerCollision.activePlatformIndex].top - this.player.height);
        }

        // Top
        if (this.playerCollision.active && this.playerCollision.top.active) {
            this.player.position.setY(this.platforms[this.playerCollision.activePlatformIndex].bottom + 1);
            this.player.velocity.setY(this.player.velocity.getY + this.gravity);

            // console.log('top');
        }

        // X position
        // Left
        if (this.playerCollision.active && this.playerCollision.left.active) {
            this.player.position.setX(this.platforms[this.playerCollision.left.activePlatformIndex].right + 1);
            // console.log('left');
        }

        // Right
        if (this.playerCollision.active && this.playerCollision.right.active) {
            this.player.position.setX(this.platforms[this.playerCollision.right.activePlatformIndex].left - this.player.width - 1);
            // console.log('right');
        }

        console.log(this.player.position.getY);
    }

    render(ctx) {
        this.createSky(ctx);
        this.renderPlatforms(ctx);
        this.player.render(ctx);
    }
}