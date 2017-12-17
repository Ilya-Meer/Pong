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
		this.finished = false;
		
		// Instantiate Playing Field
		this.board = new Board(this.width, this.height);
		this.boardGap = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.reset();

		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
			if (event.key === 'r') {
				this.reset();
			}
		});
	}


	reset() {
		// Instantiate a Ball
		this.ball1 = new Ball(20, this.width, this.height, this, 1);

		// Instantiate another Ball
		this.ball2 = new Ball(8, this.width, this.height, this, -1);

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
	}


	// Pause the Game
	render() {
		if (this.pause) {
			return;
		}
		
		if (this.paddle1.score >= 11 || this.paddle2.score >= 11) {
			this.finished = true;
		}

		if (this.finished) {
			this.finished = !this.finished;
			this.pause = true;
			this.reset();
			alert('Please press the space bar to start a new game!');
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
		this.ball1.render(svg, this.paddle1, this.paddle2);
		this.ball2.render(svg, this.paddle1, this.paddle2);
		this.score1.render(svg, this.paddle1.score);
		this.score2.render(svg, this.paddle2.score);

	}

}