let groundHeight = 120;
let groundWidth = 120;
let mapHeight = 959;
let mapWidth = 4096;
let groundPositionY = 839;
let ctx;
let marioPositionY = 539;
let marioHeight = 120;
let marioWidth = 120;
let backgroundWidth = 1024;
let pipeWidth = 120;
let pipeHeight = 120;
let matrix = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 2, 0, 2, 0],
];
ctx = document.getElementById('frame').getContext('2d');

const ground = {
  draw() {
    let img = new Image();
    img.src = 'images/ground-small.png';
    img.onload = function () {
      for (let i = 0; i * groundWidth < mapWidth; i++) {
        ctx.drawImage(img, i * groundWidth, groundPositionY, groundWidth, groundHeight);
      }
      mario.draw();
    }
  },
}

const map = {
  draw() {
    let img = new Image();
    img.src = 'images/bg.jpg';
    img.onload = function () {
      for (let i = 0; i * backgroundWidth < mapWidth; i++) {
        ctx.drawImage(img, i * backgroundWidth, 0);  
      }
      ground.draw();
    }
  },
}

const mario = {
  draw(x, y) {
    let img = new Image();
    img.src = 'images/ogMario.png';
    img.onload = function () {
      ctx.drawImage(img, x, y * 720, marioWidth, marioHeight);
    }
  },
}

// TODO
// const pipe = { 
//   draw(x, y) {
//     let img = new Image();
//     img.src = 'images/pipe-tr.png';
//     img.onload = function () {
//       ctx.drawImage(img, y * pipeWidth, x * pipeHeight, pipeWidth, pipeHeight);
//     }
//   },
// }

function setMarioPosition() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 1) {
        mario.draw(i, j);
      }
    }
  }
}

function setPipePosition() {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 2) {
        pipe.draw(i, j);
      }
    }
  }
}
map.draw();
setMarioPosition();
setPipePosition();
