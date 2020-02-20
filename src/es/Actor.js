import Vector2D from './Vector';

export default class Actor {
    constructor() {
        this.height = 100,
        this.width = 50,
        this.color = 'black',
        this.position = new Vector2D(0, 0),
        this.velocity = new Vector2D(),
        this.jumpDistance = 25;
        this.isOnGround = false;
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

    move(direction) {
        if (direction === -1) { 
            this.velocity.x = -5;
        } else {
            this.velocity.x = 5;
        } 
    }

    stop() {
        this.velocity.x = 0;
    }

    jump() {
        // console.log('jumping!');
        this.velocity.y = -this.jumpDistance;
    }

    attack() {
        console.log('attacking!');
    }

    update(step) {
        // this.position.x += Math.ceil(this.velocity.x * step);
        // this.position.y += Math.ceil(this.velocity.y * step);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}