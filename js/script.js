import pipes from './pipes.js';

let rightPressed;
let leftPressed;
let upPressed;
let initX = 0;
let initY = 400;
let groundLevel;
const marioBack = document.getElementById('mario').offsetLeft;
const marioFront = marioBack + 88;
const ground = 400;
const step = 10;
const jump = 10;
const jumpHold = 100;

// pipes, mario, controller

pipes.create(10);

function isMarioOnPipe() {
  const pipeLeftSide = pipes.getLeftSide();
  return initY === pipes.top
    && marioFront >= pipeLeftSide
    && marioBack <= pipeLeftSide + pipes.width;
}

function setGravity() {
  const time = setInterval(() => {
    if (initY >= ground || isMarioOnPipe()) {
      clearInterval(time);
    } else {
      initY += jump;
      document.getElementById('mario').style.top = `${initY}px`;
    }
  }, 50);
  return time;
}

function onGround() {
  if (document.getElementById('mario').offsetTop === ground) {
    groundLevel = true;
    return groundLevel;
  }
  return false;
}

function marioBeforePipe() {
  if (marioFront + 2 === pipes.getLeftSide()) {
    rightPressed = false;
  }
}

function marioAfterPipe() {
  if (marioBack === pipes.getLeftSide() + pipes.width) {
    leftPressed = false;
  }
}

function keyDownHandler(event) {
  if (event.key === 'ArrowRight') {
    rightPressed = true;
    marioBeforePipe();
    if (rightPressed || initY <= pipes.top) {
      initX -= step;
      document.getElementById('gameField').style.left = `${initX}px`;
      setGravity();
    }
  }
  if (event.key === 'ArrowLeft' && initX < 330) {
    leftPressed = true;
    marioAfterPipe();
    if (leftPressed) {
      initX += step;
      document.getElementById('gameField').style.left = `${initX}px`;
      setGravity();
    }
  }
  if (event.key === 'ArrowUp' && initY > 300) {
    const isOnGround = onGround();
    if (isOnGround) {
      upPressed = true;
      initY -= jumpHold;
      document.getElementById('mario').style.top = `${initY}px`;
      setGravity();
    }
    if (upPressed) {
      console.log(initY);
      setTimeout(() => {
        initY -= jumpHold;
        document.getElementById('mario').style.top = `${initY}px`;
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
