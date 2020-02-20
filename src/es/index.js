import '../sass/style.scss';

import Controller from './Controller';
import Game from './Game';
import Engine from './Engine';

export const controller = new Controller();
const game = new Game();
const engine = new Engine(game);

game.init();
engine.start();

window.addEventListener('keydown', event => controller.keyEvent(event));
window.addEventListener('keyup', event => controller.keyEvent(event));