export default {
  offset: 400,
  top: 250,
  width: 100,
  back: [],
  front: [],
  getLeftSide() {
    const gameFieldX = document.getElementById('gameField').offsetLeft;
    return this.offset + (gameFieldX % this.offset);
  },
  getRightSide() {
    return this.getLeftSide() + this.width;
  },
  getElements() {
    return Array.from(document.getElementsByClassName('pipe'));
  },
  getBack() {
    for (let i = 0; i < this.getElements().length; i++) {
      this.back.push(parseInt(this.getElements()[i].style.left, 10));
    }
  },
  getFront() {
    this.front = this.back.map((element) => element + this.width);
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
