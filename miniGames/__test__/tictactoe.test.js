const ticTacToe = require("./services/tictactoeService");
const data = require("./data/tictactoe");

class Td {
  constructor(textContent) {
    this.textContent = textContent;
  }
}

describe("ticTacToe", () => {
  beforeEach(() => {
    data.tds.push([new Td("X"), new Td(""), new Td("X")]);
    data.tds.push([new Td(""), new Td(""), new Td("")]);
    data.tds.push([new Td(""), new Td(""), new Td("")]);
  });
  afterEach(() => {
    data.tds.splice(0);
  });

  test("Test print tds Array.", () => {
    const tds = ticTacToe.print();
    console.log(tds);
  });

  // 현재 칸이 빈칸인지 확인을 위한 테스트
  test("Test if the current field is empty.", () => {
    expect(ticTacToe.isEmpty(0, 0)).toBeTruthy(); // toBe(true);
    expect(ticTacToe.isEmpty(0, 1)).toBeFalsy(); // toBe(false);
  });

  // 빈칸인 경우 해당 칸에 현재 턴을 표시한다.
  test("Test marking board", () => {
    expect(ticTacToe.mark(0, 1, "X"));
  });

  test("Test if the game can go any further.", () => {
    expect(ticTacToe.isGameOver(0, 1, "X")).toBeFalsy();
  });

  test("Test who the winner is", () => {
    expect(ticTacToe.mark(0, 1, "X"));
    expect(ticTacToe.findWinner(0, 1, "X"));
  });
});
