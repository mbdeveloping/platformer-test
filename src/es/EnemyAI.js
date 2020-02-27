import Vector2D from "./Vector";

export default class EnemyAI {
    constructor(actor) {
        this.actor = actor,
        this.debug = {
            active: true,
            border: {
                
            }
        },
        this.combat = {
            active: false,
            width: 300,
            height: 250,
            position: new Vector2D(this.actor.position.getX - (this.width / 2) + (this.actor.width / 2), this.actor.position.getY  - (this.height / 2)),
            get left() {
                return this.position.getX;
            },
            get right() {
                return this.position.getX + this.width;
            },
            get top() {
                return this.position.getY;
            },
            get bottom() {
                return this.position.getY + this.height;
            }
        }
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

    update() {
        this.combat.position.setX(this.actor.position.getX - (this.combat.width / 2) + (this.actor.width / 2));
        this.combat.position.setY(this.actor.position.getY  - (this.combat.height / 2));
    }

    render(ctx) {
        ctx.strokeRect(this.combat.position.x, this.combat.position.y, this.combat.width, this.combat.height);
    }
}