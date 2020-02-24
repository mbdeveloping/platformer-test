import Actor from './Actor';

export default class Player extends Actor {
    constructor() {
        super();
        this.type = 'player',
        this.color = 'red'
    }
}