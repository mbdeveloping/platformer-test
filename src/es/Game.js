import {controller, debug} from './index';
import World from "./World";

export default class Game {
    constructor() {
        this.canvas = null,
        this.context = null,
        this.canvasWidth = 1300,
        this.canvasHeight = 650,
        this.world = new World(this.canvasWidth, this.canvasHeight, this.canvasWidth, this.canvasHeight)
    }

    update() {
        this.world.update();

        if (controller.left.active || controller.right.active ) {
            controller.left.active ? this.world.player.move(-1) : this.world.player.move(1);
        } else {
            this.world.player.stop();
        }
        if (controller.up.active && this.world.playerCollision.active) {
            this.world.playerCollision.active = false;
            this.world.player.jump();
        }
        // console.log(this.world.playerCollision);

        console.log(debug.state);
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