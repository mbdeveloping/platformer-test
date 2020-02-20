export default class Debug {
    constructor(state) {
        this.state = state,
        this.mouseIsClicked = false
    
    }

    mouseClick(event) {
        if (event.type === 'mousedown') {
            this.mouseIsClicked = true;
        } else if (event.type === 'mouseup') {
            this.mouseIsClicked = false;
        } 
    }
}