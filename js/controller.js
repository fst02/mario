import pipes from './pipes.js';
import mario from './mario.js';
import world from './world.js';
import goomba from './goomba.js';

let rightPressed;
let leftPressed;
let upPressed;
const step = 10;
let hasWon = false;
const welcomeMessage = document.getElementById('welcomeMessage');

function getFlagPosition() {
  return document.getElementById('flag').getBoundingClientRect().left;
}

function winCondition() {
  if (hasWon) {
    return false;
  }
  if (mario.getElement().getBoundingClientRect().left === getFlagPosition()) {
    hasWon = true;
  }
  return hasWon;
}

function getUsername(message, defaultValue) {
  const playerName = prompt(message, defaultValue);
  if (playerName == null) {
    return defaultValue;
  }
  return playerName;
}

function setUsername() {
  if (winCondition() === true) {
    window.localStorage.setItem('username', getUsername('Congratulations! Well done! You won! Please give your username: ', 'Anonymous'));
    const player = window.localStorage.getItem('username');
    welcomeMessage.innerHTML = `Welcome ${player}!`;
  }
}

function setGravity() {
  const aboveGround = setInterval(() => {
    if (mario.position >= mario.ground || mario.isOnPipe()) {
      clearInterval(aboveGround);
    } else {
      mario.position += mario.jump;
      mario.moveUpwards();
    }
  }, 50);
  return aboveGround;
}

function keyDownHandler(event) {
  setUsername();
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

// https://stackoverflow.com/questions/15792855/moving-div-box-using-javascript

function moveGoombas() {
  setInterval(() => {
    if (goomba.isAfterPipe()) {
      goomba.direction = 1;
    }
    if (goomba.isBeforePipe()) {
      goomba.direction = -1;
    }
    goomba.getElements().forEach((element) => {
      element.style.left = `${parseInt(element.style.left, 10) + (step * goomba.direction)}px`;
    });
  }, 500);
}

pipes.create(10);
goomba.create(5);
moveGoombas();
eventListener();
pipes.getBack();
pipes.getFront();
