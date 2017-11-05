import {SVG_NS } from '../settings';
export default class Ball {
  
  constructor(radius, boardWidth, boardHeight, game) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;
    this.reset();
    this.game = game;
    this.ping = new Audio('public/sounds/pong-01.wav');
  }
  
  // Put Ball back in the Center
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;  
      

    // Determine Vectors for Ball Path
      this.vy = 0
      while(this.vy === 0) {
        this.vy =  Math.floor(Math.random() * 10 - 5); 
      }   
      this.vx = this.direction * (6 - Math.abs(this.vy));
  }
    
  // Determine what happens when Ball collides with Wall
  wallCollision(paddle1, paddle2) {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;
    
    if (hitLeft) {
      this.direction = -1;
      this.goal(paddle1);
    } 
    else if(hitRight) {
      this.directon = 1;
      this.goal(paddle2);
    }
    else if (hitTop || hitBottom) {
      this.vy = -this.vy;
    } 
  }
  
  paddleCollision(paddle1, paddle2) {
    if(this.vx > 0) {
      // Detect collision on right side (paddle 2)
      let paddle = paddle2.coordinates(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
      let {leftX, topY, bottomY} = paddle;
      
      if(
        // right edge of the ball is >= left edge of the paddle
        this.x + this.radius >= leftX
        &&
        this.y >= topY 
        // ball Y is >= paddle top Y
        &&
        this.y <= bottomY
        // ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx;
        this.ping.play();
      }
      
    } else {
      let paddle = paddle1.coordinates(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
      let {rightX, topY, bottomY} = paddle;
      // Detect collision on left side (paddle 1)
      
      if(
        // right edge of the ball is >= left edge of the paddle
        this.x - this.radius <= rightX
        &&
        this.y >= topY 
        // ball Y is >= paddle top Y
        &&
        this.y <= bottomY
        // ball Y is <= paddle bottom Y
      ){
        this.vx = -this.vx;
        this.ping.play();
      }
    }
  }
  
    // Define a Score Event
  goal(paddle) {
    if (paddle.score >= 5) {
      this.game.restart();
    } else {
    paddle.score++;
    this.reset();
    }
  }
  
    // Render Ball
  render(svg, paddle1, paddle2) {
    this.y += this.vy;
    this.x += this.vx; 
    this.wallCollision(paddle1, paddle2);
    this.paddleCollision(paddle1, paddle2);
    
    let ball = document.createElementNS(SVG_NS,'circle');
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'fill', 'white');
    svg.appendChild(ball);
  }
}