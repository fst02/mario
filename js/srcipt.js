let groundHeight = 120;
let groundWidth = 120;
let mapHeight = 959;
let mapWidth = 1024;
let groundPositionY = 839;
let ctx;
let marioPositionY = 539;
let marioHeight = 300;
let marioWidth = 300;

const ground = {
  draw() {
    ctx = document.getElementById('ground').getContext('2d');
    let img = new Image();
    img.src = 'images/ground-small.png';
    img.onload = function () {
      for (let i = 0; i * groundWidth < mapWidth; i++) {
        ctx.drawImage(img, i * groundWidth, groundPositionY, groundWidth, groundHeight);
      }
    }
  },
}

const map = {
  draw() {
    ctx = document.getElementById('frame').getContext('2d');
    let img = new Image();
    img.src = 'images/bg.jpg';
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      ground.draw();
    }
  },
}

const mario = {
  draw() {
    ctx = document.getElementById('mario').getContext('2d');
    let img = new Image();
    img.src = 'images/ogMario.png';
    img.onload = function () {
      ctx.drawImage(img, 0, marioPositionY, marioWidth, marioHeight);
    }
    map.draw();
  },
}
mario.draw();
