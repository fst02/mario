import pipes from './pipes.js';
import mario from './mario.js';

let rightPressed;
let leftPressed;
let upPressed;
let initX = 0;
const step = 10;

// pipes, mario, controller

pipes.create(10);

function setGravity() {
  const time = setInterval(() => {
    if (mario.initY >= mario.ground || mario.isOnPipe()) {
      clearInterval(time);
    } else {
      mario.initY += mario.jump;
      document.getElementById('mario').style.top = `${mario.initY}px`;
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
    if (rightPressed || mario.initY <= pipes.top) {
      initX -= step;
      document.getElementById('gameField').style.left = `${initX}px`;
      setGravity();
    }
  }
  if (event.key === 'ArrowLeft' && initX < 330) {
    leftPressed = true;
    if (mario.isAfterPipe()) {
      leftPressed = false;
    }
    if (leftPressed) {
      initX += step;
      document.getElementById('gameField').style.left = `${initX}px`;
      setGravity();
    }
  }
  if (event.key === 'ArrowUp' && mario.initY > 300) {
    const isOnGround = mario.isOnGround();
    if (isOnGround) {
      upPressed = true;
      mario.initY -= mario.jumpHold;
      document.getElementById('mario').style.top = `${mario.initY}px`;
      setGravity();
    }
    if (upPressed) {
      setTimeout(() => {
        mario.initY -= mario.jumpHold;
        document.getElementById('mario').style.top = `${mario.initY}px`;
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
eventListener();
