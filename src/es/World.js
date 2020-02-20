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
            top: {active: false},
            bottom: {active: false},
            left: {active: false},
            right: {active: false}
        }
    }

    rangeCollide(min0, max0, min1, max1) {
        return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    }

    playerCollide(r0, r1) {
        return this.rangeCollide(r0.position.x, r0.position.x + r0.width, r1.position.x, r1.position.x + r1.width) &&
                this.rangeCollide(r0.position.y, r0.position.y + r0.height, r1.position.y, r1.position.y + r1.height);
    }

    playerCollideBottom() {
        for (let i = 0; i < this.platforms.length; i++) {

            if (this.playerCollision.active && this.player.bottom >= this.platforms[i].top) {
                this.playerCollision.bottom.active = true;
                console.log('BOTTOM colliding!');
                break;
            } else {
                this.playerCollision.bottom.active = false;
            }
        }
    }

    playerCollideTop() {
        for (let i = 0; i < this.platforms.length; i++) {

            if (this.playerCollision.active && this.player.top >= this.platforms[i].top && this.player.top <= this.platforms[i].bottom) {
                console.log('TOP colliding!');
                break;
            }
        }
    }

    playerCollideAll() {
        for (let i = 0; i < this.platforms.length; i++) {

            if (this.playerCollide(this.player, this.platforms[i])) {
                this.playerCollision.active = true;
                this.player.position.y = this.platforms[i].position.y - this.player.height;
                break;
            } else {
                this.playerCollision.active = false;
            }
        }
    }

    createSky(ctx) {
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, this.width, this.height);
    }

    renderPlatforms(ctx) {
        this.platforms.forEach(platform => {
            ctx.fillStyle = platform.color;
            ctx.fillRect(platform.position.x, platform.position.y, platform.width, platform.height);
        });
    }

    update() {
        this.player.update();
        this.playerCollideAll();
        // this.playerCollideBottom();
        this.playerCollideTop();

        if (!this.debug) {
            
            if (this.playerCollision.active) {
                this.player.velocity.y = 0;
                
            } else {
                this.player.velocity.y += this.gravity;
            }
        }

        // console.log(this.playerCollision.active);
        console.log(this.player.velocity.y);
    }

    render(ctx) {
        this.createSky(ctx);
        this.renderPlatforms(ctx);
        this.player.render(ctx);
    }
}