import '../sass/style.scss';

import Controller from './Controller';
import Game from './Game';
import Engine from './Engine';
import Debug from './debug';

export const debug = new Debug(true);
export const controller = new Controller();
const game = new Game();
const engine = new Engine(game);

game.init();
engine.start();

window.addEventListener('keydown', event => controller.keyEvent(event));
window.addEventListener('keyup', event => controller.keyEvent(event));

// debug
// if (debug.state) {
//     window.addEventListener('mousedown', event => {debug.mouseClick(event)});
//     window.addEventListener('mouseup', event => {debug.mouseClick(event)});
//     window.addEventListener('mousemove', event => {});
// } else {
//     // window.addEventListener("mousedown", handleMouseDown, true);
//     window.addEventListener("mousemove", handleMouseDown, true);
// }
