import {SVG_NS} from '../settings';

export default class Message {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(svg) {
    let message = document.createElementNS(SVG_NS,'text');
    message.setAttributeNS(null, 'x', this.x);
    message.setAttributeNS(null, 'y', this.y);
    message.setAttributeNS(null, 'font-size', this.size);  
    message.setAttributeNS(null, 'font-family', 'Silkscreen Web' );
    message.setAttributeNS(null, 'fill', 'white');
    message.textContent = 'Game Over!';
    svg.appendChild(message);
  }

}