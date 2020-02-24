import Actor from './Actor';
import Vector2D from './Vector';

export default class Enemy extends Actor {
    constructor(posX, posY) {
        super();
        this.color = 'blue',
        this.position = new Vector2D(posX, posY)
    }
}