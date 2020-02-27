import Actor from './Actor';
import Vector2D from './Vector';
import EnemyAI from './EnemyAI';

export default class Enemy extends Actor {
    constructor(posX, posY) {
        super();
        this.color = 'blue',
        this.position = new Vector2D(posX, posY),
        this.speed = 1,
        this.ai = new EnemyAI(this)
    }
}