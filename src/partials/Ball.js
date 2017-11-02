import {SVG_NS } from '../settings';
export default class Ball {


  constructor(boardHeight, x, y, r) {
    this.boardHeight = boardHeight;
    this.x = x;
    this.y = y;    
    this.r = r;    
  }

  render(svg) {
    let ball = document.createElementNS(SVG_NS,'circle');
    ball.setAttributeNS(null, 'x', this.x);
    ball.setAttributeNS(null, 'y', this.y);
    ball.setAttributeNS(null, 'r', this.r);
    ball.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(ball);

  }

}