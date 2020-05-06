export default {
  offset: 400,
  top: 250,
  width: 100,
  getLeftSide() {
    const gameFieldX = document.getElementById('gameField').offsetLeft;
    return this.offset + (gameFieldX % this.offset);
  },
  create(quantity) {
    const pipe = document.createElement('div');
    pipe.setAttribute('class', 'pipe');
    pipe.style.left = `${this.offset}px`;
    for (let i = 1; i < quantity; i++) {
      const pipeClone = pipe.cloneNode(true);
      pipeClone.setAttribute('id', `pipe_${i}`);
      pipeClone.style.left = `${i * this.offset}px`;
      document.getElementById('gameField').appendChild(pipeClone);
    }
  },
};
