import {controller} from './index';
import World from "./World";

export default class Game {
    constructor() {
        this.debug = false,
        this.canvas = null,
        this.context = null,
        this.canvasWidth = 1300,
        this.canvasHeight = 650,
        this.world = new World(this.canvasWidth, this.canvasHeight, this.canvasWidth, this.canvasHeight, this.debug)
    }

    update() {
        this.world.update();
        
        if (controller.left.active) {
            this.world.player.moveLeft();
        } else if (controller.right.active) {
            this.world.player.moveRight();
        } else if (this.debug && controller.up.active) {
            this.world.player.moveUp();
        } else if (this.debug && controller.down.active) {
            this.world.player.moveDown();
        } else {
            this.world.player.stop(this.debug);
        }

        if (controller.jump.active && this.world.playerCollision.active) {
            this.world.playerCollision.active = false;
            this.world.player.jump();
        }
    }

    render() {
        this.world.render(this.context);
    }

     createCanvas() {
        this.canvas = document.createElement('canvas');
        document.getElementById('body').appendChild(this.canvas);
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.context = this.canvas.getContext('2d');
    }

    start() {
    }

    init () {
        this.createCanvas();
    }
}