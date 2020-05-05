
export default {
  position: 0,
  leftSide: 330,
  topSide: 300,

  move() {
    document.getElementById('gameField').style.left = `${this.position}px`;
  },
};
