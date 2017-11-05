import { SVG_NS, KEYS } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(element)


		// Instantiate Playing Field
		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		// Instantiate Ball
		this.ball = new Ball(8, this.width, this.height, this);

		// Instantiate Paddle 1
			this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z
		);

		//Instantiate Paddle 2
		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		);

		// Instantiate Scoreboard for each Player
		this.score1 = new Score(128, 30, 40);
		this.score2 = new Score(350, 30, 40);

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});
	}

		// Restart Function for Game End
	restart() {
		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.ball = new Ball(8, this.width, this.height, this);

		this.paddle1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			(this.height - this.paddleHeight) / 2,
			KEYS.a,
			KEYS.z
		);

		this.paddle2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			(this.height - this.paddleHeight) / 2,
			KEYS.up,
			KEYS.down
		);

		this.score1 = new Score(128, 30, 40);
		this.score2 = new Score(350, 30, 40);

		const gameMessage = document.querySelector('.game-wrapper');		
		gameMessage.innerHTML += '<h2 class="gameMessage">Game Over!!!!!</h2>';
		gameMessage.innerHTML += '<a class="restart" href="index.html">Restart</a>';
	}
	// End Restart


	// Pause the Game
	render() {
		if (this.pause) {
			return;
		}

	// Clear Canvas when Browser refreshes
		this.gameElement.innerHTML = '';

	// Render SVG Field
		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewbox', `0 0 ${this.width} ${this.height}`);
		svg.setAttributeNS(null, 'version', '1.1');
		this.gameElement.appendChild(svg);

	// Render Gameplay Elements
		
		this.board.render(svg);
		this.paddle1.render(svg);
		this.paddle2.render(svg);
		this.ball.render(svg, this.paddle1, this.paddle2);
		this.score1.render(svg, this.paddle1.score);
		this.score2.render(svg, this.paddle2.score);
	}

}