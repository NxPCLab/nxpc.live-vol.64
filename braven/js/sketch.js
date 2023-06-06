const xx1 = 1 -  1/16,
   xx2 = 1 - 1/8,
   xx3 = 0 + 1/8,
   xx4 = 0 + 1/16;
const yy1 = 0 + 2/16,
 yy2 = 0 + 1/16,
 yy3 = 1 - 1/16,
 yy4 = 1 - 2/16;

let x1,x2,x3,x4;
let y1,y2,y3,y4;


const initCircleScale = 10;
let circleScale = 20;
const steps = 4;
let state = 0;

function setup() {
  createCanvas(windowWidth,windowHeight)
  setScalar();
  background(200);
  noFill();
  // bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  // bezier(x4, y1-30, x4, y1-30, x1, y4+30, x1, y4+30);
  fill(0);
  noStroke();
}



function setScalar() {
  const windowScalar = windowWidth > windowHeight ? windowHeight : windowWidth;
  resizeCanvas(windowScalar, windowScalar);
  const scalar = windowScalar * 0.8;
  const offset = (width - scalar)/2;
  x1 = xx1 * scalar + offset;
  x2 = xx2 * scalar + offset;
  x3 = xx3 * scalar + offset;
  x4 = xx4 * scalar + offset;

  y1 = yy1 * scalar + offset;
  y2 = yy2 * scalar + offset;
  y3 = yy3 * scalar + offset;
  y4 = yy4 * scalar + offset;

  circleScale = initCircleScale / 100 * scalar
}



function draw() {

  background(255);

  window.onresize = (()  => setScalar())

  for (let i = 0; i <= steps; i+=0.1) {
    fill(noise(state+i)*255, 255 - noise(state+i)*255, 155);
    let t = i / steps;
    let x = bezierPoint(x1, x1, x4, x4, t);
    let y = bezierPoint(y1, y1, y4, y4, t);
    let length = cos(state+i/steps)*circleScale
    rect(x, y, circleScale, length);
    x = bezierPoint(x4, x4, x1, x1, t);
    y = bezierPoint(y1, y1, y4, y4, t);
    length = sin(state+i/steps)*circleScale
    rect(x - length, y, length, circleScale);
  }
  
  state -= 0.01;
  
  /*
  fill(noise(state)*150);
  textSize(40);
  text("proof of ", 100, 100);
  textSize(80);
  text("N PC ", 100, 300);
  */
}
