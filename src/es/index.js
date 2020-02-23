import '../sass/style.scss';

import Controller from './Controller';
import Game from './Game';
import Engine from './Engine';

export const controller = new Controller();
const game = new Game();
const engine = new Engine(game);
export const isOnGroundEl = document.getElementById('debug-text__is-on-ground');
export const playerVelY = document.getElementById('debug-text__player-vel-y');
export const playerVelX = document.getElementById('debug-text__player-vel-x');
export const playerPosY = document.getElementById('debug-text__player-pos-y');
export const playerPosX = document.getElementById('debug-text__player-pos-x');

game.init();
engine.start();

window.addEventListener('keydown', event => controller.keyEvent(event));
window.addEventListener('keyup', event => controller.keyEvent(event));

if (game.debug) {
    ['mousedown', 'mousemove'].forEach(eventName => {
        game.canvas.addEventListener(eventName, event => {
            if (event.buttons === 1) {
                game.world.player.velocity.y = 0;
                game.world.player.velocity.x = 0;
                game.world.player.position.x = event.offsetX - game.world.player.width / 2;
                game.world.player.position.y = event.offsetY - game.world.player.height / 2;
            }
        });
    });
}
