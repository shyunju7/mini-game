const data = require("../data/tictactoe");

module.exports = {
  print() {
    return data.tds;
  },
  isEmpty(x, y) {
    return data.tds[x][y].textContent !== "";
  },
  mark(x, y, currentTurn) {
    data.tds[x][y].textContent = currentTurn;
  },
  isGameOver(line, idx, currentTurn) {
    if (
      data.tds[line][0].textContent === currentTurn &&
      data.tds[line][1].textContent === currentTurn &&
      data.tds[line][2].textContent === currentTurn
    )
      return true;

    if (
      data.tds[0][idx].textContent === currentTurn &&
      data.tds[1][idx].textContent === currentTurn &&
      data.tds[2][idx].textContent === currentTurn
    )
      return true;

    if (
      data.tds[0][0].textContent === currentTurn &&
      data.tds[1][1].textContent === currentTurn &&
      data.tds[2][2].textContent === currentTurn
    )
      return true;

    if (
      data.tds[0][2].textContent === currentTurn &&
      data.tds[1][1].textContent === currentTurn &&
      data.tds[2][0].textContent === currentTurn
    )
      return true;

    return false;
  },

  findWinner(line, idx, currentTurn) {
    if (this.isGameOver(line, idx, currentTurn)) {
      return currentTurn;
    }
    // 모든 칸이 다 차있다면 무승부
    let isDraw = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (data.tds[i][j].textContent === "") {
          isDraw = false;
          break;
        }
      }
    }

    if (isDraw) {
      return `무승부`;
    }

    return `진행중`;
  },
};
