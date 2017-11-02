import {SVG_NS } from '../settings';
export default class Paddle {
  
  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch(event.key) {
        case up:
          this.up();
        break;
        case down:
          this.down();
        break;
      }
  });
} 

  up() {
    // GET SOME MAX NUMBER , either 0 or the y position minus speed
    this.y = Math.max((this.y - this.speed), 0);
  }

  down() {
    // GET THE MIN NUMBER, either the height of the board minus the paddle height, 
        // or the y position plus the speed
    this.y = Math.min((this.boardHeight - this.height), (this.y + this.speed));
  }

  render(svg) {
    let paddle = document.createElementNS(SVG_NS,'rect');
    paddle.setAttributeNS(null, 'width', this.width);
    paddle.setAttributeNS(null, 'height', this.height);
    paddle.setAttributeNS(null, 'x', this.x);
    paddle.setAttributeNS(null, 'y', this.y);
    paddle.setAttributeNS(null, 'speed', this.speed);
    paddle.setAttributeNS(null, 'score', this.score);
    paddle.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(paddle);

  }

}