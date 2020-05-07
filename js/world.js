export default {
  position: 0,
  leftSide: 200,
  topSide: 300,

  move() {
    document.getElementById('gameField').style.left = `${this.position}px`;
  },
};
