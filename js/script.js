let rightPressed;
let leftPressed;
let upPressed;
let initX = 0;
let initY = 400;

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

function keyDownHandler(event) {
  if (event.keyCode === 39) {
    rightPressed = true;
    initX -= 10;
    document.getElementById('gameField').style.left = `${initX}px`;
  }
  if (event.keyCode === 37 && initX < 330) {
    leftPressed = true;
    initX += 10;
    document.getElementById('gameField').style.left = `${initX}px`;
  }
  if (event.keyCode === 38 && initY > 200) {
    upPressed = true;
    initY -= 100;
    document.getElementById('mario').style.top = `${initY}px`;
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
    marioDown();
  }
}

// TODO
// function createPipes(quantity) {
//  let pipe = document.getElementById('pipe');
//  for (let i = 0; i < quantity; i++) {
//    document.getElementById('gameField').appendChild(pipe);
//  }
// }

eventListener();
