import Vector2D from "./Vector";

export default class Platform {
    constructor(width = 300, height = 50, x, y) {
        this.height = height,
        this.width = width,
        this.position = new Vector2D(x, y),
        this.color = 'black'
        this.colliding = {
            top: false,
            bottom: false,
            left: false,
            right: false
        }
    }

    get getX() {
        return this.position.x;
    }

    get getY() {
        return this.position.y;
    } 

    get left() {
        return this.getX;
    }

    get right() {
        return this.getX + this.width;
    }

    get top() {
        return this.getY;
    }

    get bottom() {
        return this.getY + this.height;
    }

    setX(posX) {
        this.position.x = posX;
    }
}