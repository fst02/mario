import pipes from './pipes.js';
import mario from './mario.js';
import world from './world.js';

let rightPressed;
let leftPressed;
let upPressed;
const step = 10;

function setGravity() {
  const time = setInterval(() => {
    if (mario.position >= mario.ground || mario.isOnPipe()) {
      clearInterval(time);
    } else {
      mario.position += mario.jump;
      mario.moveUpwards();
    }
  }, 50);
  return time;
}

function keyDownHandler(event) {
  if (event.key === 'ArrowRight') {
    rightPressed = true;
    if (mario.isBeforePipe()) {
      rightPressed = false;
    }
    if (rightPressed || mario.position <= pipes.top) {
      world.position -= step;
      world.move();
      setGravity();
    }
  }
  if (event.key === 'ArrowLeft' && world.position < world.leftSide) {
    leftPressed = true;
    if (mario.isAfterPipe()) {
      leftPressed = false;
    }
    if (leftPressed) {
      world.position += step;
      world.move();
      setGravity();
    }
  }
  if (event.key === 'ArrowUp' && mario.position > world.topSide) {
    const isOnGround = mario.isOnGround();
    if (isOnGround) {
      upPressed = true;
      mario.position -= mario.jumpHold;
      mario.moveUpwards();
      setGravity();
    }
    if (upPressed) {
      setTimeout(() => {
        mario.position -= mario.jumpHold;
        mario.moveUpwards();
      }, 100);
    }
  }
}

function keyUpHandler(event) {
  if (event.key === 'ArrowRight') {
    rightPressed = false;
  }
  if (event.key === 'ArrowLeft') {
    leftPressed = false;
  }
  if (event.key === 'ArrowUp') {
    upPressed = false;
  }
}

function eventListener() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
}

pipes.create(10);
eventListener();
