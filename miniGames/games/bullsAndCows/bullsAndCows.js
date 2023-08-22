const buttons = document.querySelectorAll(".num-btn");
const historyList = document.querySelector("#history-list");

const firstNum = document.querySelector("#first-number");
const secondNum = document.querySelector("#second-number");
const thirdNum = document.querySelector("#third-number");

const inputs = [firstNum, secondNum, thirdNum];
let index = 0;
let playCnt = 0;
let pickedNumbers = [];
const answer = Array(3);

function handleStartGame() {
  let idx = 0;

  while (idx !== 3) {
    let current = Math.floor(Math.random() * 10); // 0 - 9
    if (answer.indexOf(current) !== -1) continue;
    answer[idx] = current;
    idx += 1;
  }

  console.log(answer);
}

function handleRemoveNumber() {
  pickedNumbers.pop();
  index -= 1;
  inputs[index].value = "";
}

function handleRemoveInput() {
  for (let i = 0; i < 3; i++) {
    inputs[i].value = "";
  }
}

function handleCountResult() {
  const cnt = [0, 0];
  for (let i = 0; i < 3; i++) {
    if (!answer.includes(+pickedNumbers[i])) continue;
    if (answer[i] === +pickedNumbers[i]) cnt[0]++;
    else cnt[1]++;
  }

  console.log(cnt);
  return cnt;
}

function handlePickedNum(e) {
  const {
    target: { textContent },
  } = e;

  if (pickedNumbers.includes(textContent)) return;
  pickedNumbers.push(textContent);
  inputs[index++].value = textContent;

  if (pickedNumbers.length === 3) {
    const [s, b] = handleCountResult();
    historyList.innerHTML += `<div>${pickedNumbers[0]} ${pickedNumbers[1]} ${pickedNumbers[2]} ${s}s ${b}b</div>`;
    pickedNumbers = [];
    index = 0;
    playCnt += 1;
    handleRemoveInput();
    return;
  }
}
for (let button of buttons) {
  button.addEventListener("click", handlePickedNum);
}

document.addEventListener("keyup", function (e) {
  const pattern = /[0-9]/;
  if (pattern.test(e.key)) {
    if (pickedNumbers.includes(e.key)) return;
    pickedNumbers.push(e.key);
    inputs[index++].value = e.key;
    if (pickedNumbers.length === 3) {
      historyList.innerHTML += `<div>${pickedNumbers[0]} ${pickedNumbers[1]} ${pickedNumbers[2]}</div>`;
      pickedNumbers = [];
      index = 0;
      handleRemoveInput();
      return;
    }
  }
});

window.addEventListener("load", function () {
  handleStartGame();
});

/*

리팩토링
- 전역변수 줄이기(줄일 수 있으면) 
- 게임시작하는 함수(버튼을 누르거나 키를 눌렀을 때) 수정
- innerHTML 추가하는 부분 createElement() / appendChild()
// div -> label
// 히스토리에 붙이면 돼


// 테스트코드 짜기



*/
