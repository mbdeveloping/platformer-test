export default class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x,
        this.y = y
    }

    setX(posX) {
        this.x = posX;
    }

    setY(posY) {
        this.y = posY;
    }
}