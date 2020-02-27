export default class EnemyAI {
    constructor(actor) {
        this.actor = actor,
        this.isMoving = false,
        this.isOnCombat = false,
        this.isAboutToFall = false
    }

    patrol() {
        let randomDesision = Math.random() < 0.5 ? -1 : 1;

        if (!this.isOnCombat) {
            if (this.actor.collide.active) {
                if(!this.isMoving) { //if not moving, make enemy move randomly left or right
                    this.isMoving = true;

                    if (randomDesision > 0) {
                        this.actor.moveRight();
                    } else {
                        this.actor.moveLeft();
                    }
                } else { //if enemy is already moving
                    if (this.isAboutToFall) {
                        this.actor.velocity.setX(-this.actor.velocity.getX);
                    }
                    if (this.actor.collide.right) {
                        this.actor.moveLeft();
                    }
                    if (this.actor.collide.left) {
                        this.actor.moveRight();
                    }
                }
            } 
        }
    }
}