export default {
  offset: 400,
  top: 400,
  width: 100,
  distance: 625,

  getLeftSide() {
    const gameFieldX = document.getElementById('gameField').offsetLeft;
    return this.offset + (gameFieldX % this.offset);
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
