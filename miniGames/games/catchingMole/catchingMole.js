const board = document.querySelector("#game-board");
const timeLabel = document.querySelector("#time-label");
const scoreLabel = document.querySelector("#score-label");
const moles = document.querySelectorAll(".mole");
const cells = board.querySelectorAll(".cell");
let isStartGame = false;
let prevIndex = -1;
let score = 0;
let randomValue = -1;
// 두더지 잡았을 때, 이벤트 추가
for (let i = 0; i < 9; i++) {
  moles[i].addEventListener("click", function () {
    handleCatchMole(i);
  });
}

function handleReset() {
  prevIndex = -1;
  score = 0;
  randomValue = -1;
  timeLabel.textContent = "60";
  scoreLabel.textContent = "0";
}

function calculateScore() {
  score += randomValue < 1000 ? randomValue * 2 : Math.floor(randomValue / 10);
}

function handleCatchMole(index) {
  let classList = moles[index].classList;
  if (classList.contains("dead")) return;
  calculateScore();
  scoreLabel.textContent = score;
  classList.add("dead");
  handleHiddenMole(index);

  setTimeout(function () {
    classList.remove("dead");
  }, 500);
}

function handleOnClickStartButton() {
  if (isStartGame) return;
  handleReset();
  isStartGame = true;
  handleStartTimer();
}

function handleStartTimer() {
  handleJumpMole();
  let timer = 60;
  let interval = setInterval(function () {
    timer -= 1;
    timeLabel.textContent = timer;
    if (timer === 0) {
      isStartGame = false;
      clearInterval(interval);
    }
  }, 1000);
}

function handleRandomMole() {
  let index = Math.floor(Math.random() * 9);
  if (prevIndex === index) return handleRandomMole();
  prevIndex = index;
  return index;
}

function handleHiddenMole(index) {
  let mole = cells[index].querySelector(".mole");
  mole.classList.add("hidden");
}

function handleShowMole(index) {
  let mole = cells[index].querySelector(".mole");
  mole.classList.remove("hidden");
}

function handleJumpMole() {
  if (!isStartGame) return;
  let _randomTime = Math.floor(Math.random() * 1001 + 550);
  randomValue = _randomTime;
  let moleIndex = handleRandomMole();
  handleShowMole(moleIndex);

  setTimeout(function () {
    handleHiddenMole(moleIndex);
    return handleJumpMole();
  }, _randomTime);
}
