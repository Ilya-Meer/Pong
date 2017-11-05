import './styles/game.css';
import Game from './partials/Game'

// Create a Game Instance
const game = new Game('game', 512, 256);

// Align Game rendering with Browser Refresh Rate
(function gameLoop() {
    game.render();
    // requestAnimationFrame(gameLoop);

})();
