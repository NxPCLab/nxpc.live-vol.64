const xx1 = 1 - 1 / 16,
  xx2 = 1 - 1 / 8,
  xx3 = 0 + 1 / 8,
  xx4 = 0 + 1 / 16;
const yy1 = 0 + 2 / 16,
  yy2 = 0 + 1 / 16,
  yy3 = 1 - 1 / 16,
  yy4 = 1 - 2 / 16;

let x1, x2, x3, x4;
let y1, y2, y3, y4;

const initCircleScale = 10;
let circleScale = 20;
const steps = 10;
let state = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setScalar();
  background(200);
  noFill();
  // bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  // bezier(x4, y1-30, x4, y1-30, x1, y4+30, x1, y4+30);
  fill(0);
  noStroke();
}

let windowScale = 0;

function setScalar() {
  windowScale = windowWidth > windowHeight ? windowHeight : windowWidth;
  resizeCanvas(windowScale, windowScale);
  const scalar = windowScale * 0.8;
  const offset = (width - scalar) / 2;
  x1 = xx1 * scalar + offset;
  x2 = xx2 * scalar + offset;
  x3 = xx3 * scalar + offset;
  x4 = xx4 * scalar + offset;

  y1 = yy1 * scalar + offset;
  y2 = yy2 * scalar + offset;
  y3 = yy3 * scalar + offset;
  y4 = yy4 * scalar + offset;

  circleScale = (initCircleScale / 100) * scalar;
}

let looper = 0;
const render = (fn) => fn;
const interval = 10000;
let nextTime = interval;

function draw() {
  background(255);
  window.onresize = () => setScalar();
  looper = floor(millis() / interval) % variation1.length; //（ページが読み込まれてからのmillis秒）を、単位時間で割る。
  fill(0, 0, 255);
  push();
  render(variation1[looper]());
  pop();
  state -= 0.01;
}

let variation1 = [
  () => {
    rectMode(CENTER);
    resolution = floor(10 * (sin(state) + 1) + 3);
    const unitWidth = width / resolution;
    for (let i = 1; i < resolution; i++) {
      for (let j = 1; j < resolution; j++) {
        if (i == j || i == resolution - j) {
          rect(i * unitWidth, j * unitWidth, unitWidth);
        }
      }
    }
  },
  () => {
    for (let i = 0; i <= steps; i += 0.1) {
      // fill(0, 255 - noise(state + i) * 250, noise(state + i) * 250);
      let t = i / steps;
      let x = bezierPoint(x1, x2, x3, x4, t);
      let y = bezierPoint(y1, y2, y3, y4, t);
      circle(x, y, noise(state + i) * circleScale);
      push();
      fill(255);
      // fill(26, 255, 37);
      circle(
        x + 100 * noise(i) - 50,
        y - 100 * noise(state + i) + 50,
        5 * noise(i)
      );
      pop();
      x = bezierPoint(x4, x4, x1, x1, t);
      y = bezierPoint(y1 - 30, y1 - 30, y4 + 30, y4 + 30, t);
      rect(x, y, noise(state + i + 50) * circleScale);
      if (i < steps - 0.1) {
        push();
        fill(255);
        // fill(26, 255, 37);
        circle(
          x + 100 * noise(i) - 50,
          y - 100 * noise(state + i) + 50,
          10 * noise(i)
        );
        pop();
      }
    }
  },
  () => {
    for (let i = 0; i <= steps; i += 0.1) {
      fill(0, 0, 255);
      // fill(noise(state + i) * 255, 255 - noise(state + i) * 255, 155);
      let t = i / steps;
      let x = bezierPoint(x1, x1, x4, x4, t);
      let y = bezierPoint(y1, y1, y4, y4, t);
      let length = cos(state + i / steps) * circleScale;
      rect(x, y, circleScale, length);
      x = bezierPoint(x4, x4, x1, x1, t);
      y = bezierPoint(y1, y1, y4, y4, t);
      length = sin(state + i / steps) * circleScale;
      rect(x - length, y, length, circleScale);
    }
  },
  () => {
    for (let i = 0; i <= steps; i += 0.1) {
      fill(0, 0, 255);
      // fill(noise(state + i) * 150);
      let t = i / steps;
      let x = bezierPoint(x1, x2, x3, x4, t);
      let y = bezierPoint(y1, y2, y3, y4, t);
      circle(x, y, noise(state + i) * circleScale);
      x = bezierPoint(x4, x4, x1, x1, t);
      y = bezierPoint(y1 - 30, y1 - 30, y4 + 30, y4 + 30, t);
      circle(x, y, noise(state + i + 50) * circleScale);
    }
  },
  () => {
    for (let i = 0; i <= steps; i += 0.1) {
      // fill(
      //   noise(state + i) * 255,
      //   255 - noise(state + i) * 255,
      //   noise(state + i) * 255
      // );
      fill(0, 0, 255);
      let t = i / steps;
      let x = bezierPoint(x1, x2, x3, x4, t);
      let y = bezierPoint(y1, y2, y3, y4, t);
      let length = cos(state + i / steps) * circleScale;
      rect(x, y, length);
      x = bezierPoint(x4, x3, x2, x1, t);
      y = bezierPoint(y1, y2, y3, y4, t);
      length = sin(state + i / steps) * circleScale;
      rect(x - length, y, length);
    }
  },
];
