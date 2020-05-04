let rightPressed;
let leftPressed;
let upPressed;
let initX = 0;
let initY = 400;
let groundLevel;
const marioBack = document.getElementById('mario').offsetLeft;
const marioFront = marioBack + 88;
const pipeOffset = 400;
const pipeTop = 250;
const ground = 400;
const step = 10;
const jump = 10;
const jumpHold = 100;
const pipeWidth = 100;

function calcPipeBack() {
  const gameFieldX = Math.abs(document.getElementById('gameField').offsetLeft);
  const pipeBack = (pipeOffset - (gameFieldX % pipeOffset));
  return pipeBack;
}

function createPipes(quantity) {
  const pipe1 = document.createElement('div');
  pipe1.setAttribute('class', 'pipe');
  pipe1.style.left = `${pipeOffset}px`;
  document.getElementById('gameField').appendChild(pipe1);
  const pipe = document.getElementsByClassName('pipe')[0];
  for (let i = 2; i < quantity; i++) {
    const pipeClone = pipe.cloneNode(true);
    pipeClone.setAttribute('id', `pipe_${i}`);
    pipeClone.style.left = `${i * pipeOffset}px`;
    document.getElementById('gameField').appendChild(pipeClone);
  }
}
createPipes(10);

function setGravity() {
  const time = setInterval(() => {
    if (initY >= ground || (initY === pipeTop && marioFront >= calcPipeBack() && marioBack <= calcPipeBack() + pipeWidth)) {
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
  if (marioFront + 2 === calcPipeBack()) {
    rightPressed = false;
  }
}

function marioAfterPipe() {
  if (marioBack === calcPipeBack() + pipeWidth) {
    leftPressed = false;
  }
}

function keyDownHandler(event) {
  if (event.key === 'ArrowRight') {
    rightPressed = true;
    marioBeforePipe();
    if (rightPressed || initY <= pipeTop) {
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
