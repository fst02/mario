import pipes from './pipes.js';
import goomba from './goomba.js';
import world from './world.js';

export default {
  position: 400,
  width: 88,
  jump: 10,
  jumpHold: 100,
  ground: 400,
  deadJump: 10,

  moveUpwards() {
    this.getElement().style.top = `${this.position}px`;
  },

  getElement() {
    return document.getElementById('mario');
  },

  getLeftSide() {
    return document.getElementById('mario').offsetLeft;
  },

  getRightSide() {
    return this.getLeftSide() + this.width;
  },

  isOnPipe() {
    const pipeLeftSide = pipes.getLeftSide();
    return this.position === pipes.top
      && this.getRightSide() >= pipeLeftSide
      && this.getLeftSide() <= pipeLeftSide + pipes.width;
  },

  isOnGround() {
    return document.getElementById('mario').offsetTop === this.ground;
  },

  isBeforePipe() {
    return this.getRightSide() + 2 === pipes.getLeftSide();
  },

  isAfterPipe() {
    return this.getLeftSide() === pipes.getRightSide();
  },

  getPosition() {
    return (-1 * world.getPosition()) + 300;
  },

  isDead() {
    let isDead = false;
    const marioPosition = this.getPosition();
    goomba.getElements().forEach((goombaElement) => {
      if (
        marioPosition >= parseInt(goombaElement.style.left, 10)
        && marioPosition <= (parseInt(goombaElement.style.left, 10) + goomba.width)
      ) {
        isDead = true;
      }
    });
    return isDead;
  },
};
