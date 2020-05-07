import pipes from './pipes.js';

export default {
  offset: 400,
  top: 400,
  width: 100,
  distance: 625,
  speed: 10,
  direction: 1,

  getElements() {
    return Array.from(document.getElementsByClassName('goomba'));
  },

  getBackSides() {
    return this.getElements().map((element) => parseInt(element.style.left, 10));
  },

  getFrontSides() {
    return this.getBackSides().map((backSide) => backSide + 50);
  },

  isAfterPipe() {
    const backSides = this.getBackSides();
    for (let i = 0; i < backSides.length; i++) {
      if (backSides[i] <= pipes.front[i]) {
        return true;
      }
      return false;
    }
  },

  isBeforePipe() {
    const frontSides = this.getFrontSides();
    for (let i = 0; i < frontSides.length; i++) {
      if (frontSides[i] >= pipes.back[i + 1]) {
        return true;
      }
      return false;
    }
  },

  create(quantity) {
    const goomba = document.createElement('div');
    goomba.setAttribute('class', 'goomba');
    goomba.style.left = `${this.offset}px`;
    for (let i = 0; i < quantity; i++) {
      const goombaClone = goomba.cloneNode(true);
      goombaClone.setAttribute('id', `goomba_${i}`);
      goombaClone.style.left = `${this.distance + i * this.offset}px`;
      document.getElementById('gameField').appendChild(goombaClone);
    }
  },
};
