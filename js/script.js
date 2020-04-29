const groundHeight = 100;
const groundWidth = 100;
const mapHeight = 600;
const mapWidth = 800;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
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
  if (event.keyCode === 37) {
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
eventListener();
