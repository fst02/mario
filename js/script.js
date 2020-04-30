let rightPressed;
let leftPressed;
let upPressed;
let initX = 0;
let initY = 400;
let groundLevel;
let marioBack = document.getElementById('mario').offsetLeft;
let marioFront = marioBack + 88;
let pipeOffset = 400;

function calcPipeBack() {
  let gameFieldX = Math.abs(document.getElementById('gameField').offsetLeft); 
  let pipeBack = (pipeOffset - (gameFieldX % pipeOffset));
  return pipeBack;
}

function createPipes(quantity) {
  let pipe1 = document.createElement('div');
  pipe1.setAttribute('id', 'pipe');
  document.getElementById('gameField').appendChild(pipe1);
  let pipe = document.getElementById('pipe');
  for (let i = 0; i < quantity; i++) {
    let pipeClone = pipe.cloneNode(true);
    pipeClone.style.left = `${i * pipeOffset}px`;
    document.getElementById('gameField').appendChild(pipeClone);
  }
}
createPipes(10);

function eventListener() {
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);
}

function marioDown() {
  const time = setInterval(() => {
    initY += 10;
    document.getElementById('mario').style.top = `${initY}px`;
    if (initY >= 400) {
      clearInterval(time);
    }
  }, 50);
}

function onGround() {
  if (document.getElementById('mario').offsetTop === 400) {
    groundLevel = true;
    return groundLevel;
  }
}

function marioBeforePipe() {
  if (marioFront + 2 === calcPipeBack()) {
    rightPressed = false;
  } 

}

function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
    marioBeforePipe();
    if (rightPressed) {    
    initX -= 10;
    document.getElementById('gameField').style.left = `${initX}px`;       
     }  
  }
  if (event.keyCode === 37 && initX < 330) {
    leftPressed = true;
    initX += 10;
    document.getElementById('gameField').style.left = `${initX}px`;
  }
  if (event.keyCode === 38 && initY > 200) {
    let isOnGround = onGround();
    if (isOnGround) {
      upPressed = true;
      initY -= 100;
      document.getElementById('mario').style.top = `${initY}px`;
      marioDown();
    }
    if (upPressed) {
      setTimeout(() => {
        initY -= 100;
        document.getElementById('mario').style.top = `${initY}px`;
      }, 100);
    }
  }
}

function keyUpHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = false;
  }
  if (event.keyCode === 37) {
    leftPressed = false;
  }
  if (event.keyCode === 38) {
    upPressed = false;
  }
}

eventListener();
