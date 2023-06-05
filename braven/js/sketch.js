const x1 = 300,
   x2 = 250,
   x3 = 150,
   x4 = 100;
const y1 = 130,
 y2 = 0,
 y3 = 400,
 y4 = 270;


const circleScale = 20;
const steps = 4;
let state = 0;

function setup() {
  createCanvas(400, 400);
  background(200);
  noFill();
  
  // bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  // bezier(x4, y1-30, x4, y1-30, x1, y4+30, x1, y4+30);
  fill(0);
  noStroke();
}

function draw() {
  background(255);
  
  
  for (let i = 0; i <= steps; i+=0.1) {
    fill(noise(state+i)*255, 255 - noise(state+i)*255, 155);
    let t = i / steps;
    let x = bezierPoint(x1, x1, x4, x4, t);
    let y = bezierPoint(y1-50, y1-50, y4, y4, t);
    let length = cos(state+i/steps)*circleScale
    rect(x, y, circleScale, length);
    x = bezierPoint(x4, x4, x1, x1, t);
    y = bezierPoint(y1-50, y1-50, y4, y4, t);
    length = sin(state+i/steps)*circleScale
    rect(x - length, y, length, circleScale);
  }
  state -= 0.01;
  
  fill(noise(state)*150);
  textSize(40);
  text("proof of ", 100, 100);
  textSize(80);
  text("N PC ", 100, 300);
}
