const firstLine = document.querySelector("#first-line");
const secondLine = document.querySelector("#second-line");
const thirdLine = document.querySelector("#third-line");
const resetButton = document.querySelector("#reset-btn");
const msg = document.querySelector("#result-msg");

// 현재 턴 표시
const xTurn = document.querySelector("#x-turn");
const oTurn = document.querySelector("#o-turn");
const board = [firstLine, secondLine, thirdLine];
const tds = [[], [], []];
let currentTurn = "X";
let isDone = false;

xTurn.classList.add("current-turn");

for (let idx = 0; idx < 3; idx++) {
  tds[0].push(firstLine.querySelectorAll("td").item(idx));
  tds[1].push(secondLine.querySelectorAll("td").item(idx));
  tds[2].push(thirdLine.querySelectorAll("td").item(idx));
}

// 게임이 끝났는지 여부
function isGameOver(line, idx) {
  // 가로줄 검사
  if (
    tds[line][0].textContent === currentTurn &&
    tds[line][1].textContent === currentTurn &&
    tds[line][2].textContent === currentTurn
  )
    return true;
  // 세로줄 검사
  if (
    tds[0][idx].textContent === currentTurn &&
    tds[1][idx].textContent === currentTurn &&
    tds[2][idx].textContent === currentTurn
  )
    return true;

  // 대각선 검사
  if (
    tds[0][0].textContent === currentTurn &&
    tds[1][1].textContent === currentTurn &&
    tds[2][2].textContent === currentTurn
  )
    return true;

  if (
    tds[0][2].textContent === currentTurn &&
    tds[1][1].textContent === currentTurn &&
    tds[2][0].textContent === currentTurn
  )
    return true;

  return false;
}

// 게임을 진행하기 위한 메서드
function handleMakeMarking(e) {
  let { target } = e;
  let line = board.indexOf(target.parentNode);
  let idx = tds[line].indexOf(target);

  if (isDone) return;

  if (tds[line][idx].textContent !== "") return;
  tds[line][idx].textContent = currentTurn;

  if (isGameOver(line, idx)) {
    currentTurn === "X"
      ? xTurn.classList.add("winner")
      : oTurn.classList.add("winner");

    isDone = true;
    return;
  }
  // 모든 칸이 다 차있다면 무승부
  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (tds[i][j].textContent === "") {
        isDraw = false;
        break;
      }
    }
  }

  if (isDraw) {
    xTurn.classList.add("winner");
    oTurn.classList.add("winner");
    isDone = true;
  }

  currentTurn = currentTurn === "X" ? "O" : "X";

  if (currentTurn === "X") {
    xTurn.classList.add("current-turn");
    oTurn.classList.remove("current-turn");
  } else {
    oTurn.classList.add("current-turn");
    xTurn.classList.remove("current-turn");
  }
}

/* 게임 리셋을 위한 메서드 */
function handleReset() {
  isDone = false;
  currentTurn = "X";
  xTurn.classList.add("current-turn");
  xTurn.classList.remove("winner");
  oTurn.classList.remove("winner");
  oTurn.classList.remove("current-turn");

  for (let idx = 0; idx < 3; idx++) {
    tds[0][idx].textContent = "";
    tds[1][idx].textContent = "";
    tds[2][idx].textContent = "";
  }
}

/* 이벤트 리스너 추가 */
for (let idx = 0; idx < 3; idx++) {
  tds[0][idx].addEventListener("click", handleMakeMarking);
  tds[1][idx].addEventListener("click", handleMakeMarking);
  tds[2][idx].addEventListener("click", handleMakeMarking);
}

resetButton.addEventListener("click", handleReset);
