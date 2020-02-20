import Vector2D from "./Vector";

export default class Platform {
    constructor(width = 300, height = 50, x, y) {
        this.height = height,
        this.width = width,
        this.position = new Vector2D(x, y),
        this.color = 'black'
    }

    get left() {
        return this.position.x;
    }

    get right() {
        return this.position.x + this.width;
    }

    get top() {
        return this.position.y;
    }

    get bottom() {
        return this.position.y + this.height;
    }
}