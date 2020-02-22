import Vector2D from "./Vector";
import Player from "./Player";
import Platform from "./Platform";

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

    // playerCollideBottom(index) {
    //     return this.player.bottom >= this.platforms[index].top && this.player.top < this.platforms[index].top;
    // }

    // playerCollideTop(index) {
    //     return this.player.top <= this.platforms[index].bottom && this.player.bottom > this.platforms[index].bottom;
    // }

    // playerCollideLeft(index) {
    //     return this.player.left <= this.platforms[index].right && this.player.right > this.platforms[index].right && this.player.bottom >= this.platforms[index].bottom;
    // }

    // playerCollideRight(index) {
    //     return this.player.right >= this.platforms[index].left && this.player.left < this.platforms[index].left && this.player.bottom >= this.platforms[index].bottom;
    // }

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
        // console.log('left', i);
    }

    setActiveRight(bool, i) {
        this.playerCollision.right.active = bool;
        this.playerCollision.right.activePlatformIndex = i;
        // console.log('right', i);
    }


    // Checks if player collides with any platform and breaks the loop and returns true when it finds first collision
    playerCollideAll() {
        // for (let i = 0; i < this.platforms.length; i++) {

        //     if (this.objectCollide(this.player, this.platforms[i])) {
        //         // this.playerCollision.active = true;
        //         // this.playerCollision.activePlatformIndex = i;
        //         break;
        //     } else {
        //         // this.playerCollision.active = false;
        //         // this.playerCollision.activePlatformIndex = null;
        //     }
        // }

        this.platforms.forEach((platform, i) => {
            const player = this.player;

            if (this.objectCollide(player, platform)) {
                platform.color = 'brown'; //@todo tt rm
                this.playerCollision.active = true;

                // bottom
                if (this.rangeCollide(player.top, player.bottom, platform.top, platform.bottom)) {
                    this.setActiveBottom(true, i);
                    
                } else {
                    this.setActiveBottom(false, null);
                }

                //
            } else {
                platform.color = 'black'; //@todo tt rm
                
                this.playerCollision.active = false;
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
            // this.playerCollision.active = true;
        } else {
            // this.playerCollision.active = false;
        }
    }

    // ttCollide() {
    //     let arrOfCollidedPlatforms = this.platforms.filter((platform, i) => {
    //         if (this.objectCollide(this.player, platform)) {
    //             return true;
    //         }
    //     });

    //     arrOfCollidedPlatforms.forEach((platform, i) => {
    //         console.log(i);
    //     });
    // }

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
        this.worldBoundriesCollision();
        // this.ttCollide();
        // this.platforms[1].setX(this.platforms[1].getX + 1); // move platform

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
            this.player.position.setY(this.platforms[this.playerCollision.bottom.activePlatformIndex].top - this.player.height);
        }

        // Top
        if (this.playerCollision.active && this.playerCollision.top.active) {
            this.player.position.setY(this.platforms[this.playerCollision.top.activePlatformIndex].bottom);
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

        // console.log(this.player.position.getY);
        // console.log(this.player.velocity.getY);
        // console.log(this.player.velocity.getX);

        // console.log(this.playerCollision.bottom.active);
        console.log(this.playerCollision.active);
    }

    render(ctx) {
        this.createSky(ctx);
        this.renderPlatforms(ctx);
        this.player.render(ctx);
    }
}