import pipes from './pipes.js';

export default {
  position: 400,
  width: 88,
  jump: 10,
  jumpHold: 100,
  ground: 400,

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
};
