import Actor from './Actor';
import Vector2D from './Vector';

export default class Enemy extends Actor {
    constructor(posX, posY) {
        super();
        this.color = 'blue',
        this.position = new Vector2D(posX, posY),
        //enemy specific
        this.speed = 1,
        this.isOnCombat = false,
        this.ai = {
            isOnCombat: false,
            isMoving: false,

        }
    }

    patrol() {
        let randomDesision = Math.random() < 0.5 ? -1 : 1;

        if (!this.isOnCombat) {
            if (this.isColliding) {
                if(!this.ai.isMoving) { //if not moving, make enemy move randomly left or right
                    this.ai.isMoving = true;

                    if (randomDesision > 0) {
                        this.moveRight();
                    } else {
                        this.moveLeft();
                    }
                } else { //if enemy is already moving
                    if (this.isCollidingRight) {
                        this.moveLeft();
                    }
                    if (this.isCollidingLeft) {
                        this.moveRight();
                    }
                }
            } 
            // console.log(this.isCollidingRight);
            // console.log(this.isCollidingLeft);
        }
    }

}