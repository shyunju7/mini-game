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
  return cnt;
}

function handlePickedNum(num) {
  if (pickedNumbers.includes(num)) return;
  inputs[index++].value = num;
  pickedNumbers.push(num);

  if (pickedNumbers.length === 3) {
    const [s, b] = handleCountResult();

    setTimeout(() => {

    historyList.innerHTML += `<tr class='history-item'>
                            <td>${pickedNumbers[0]}</td>
                            <td>${pickedNumbers[1]}</td>
                            <td>${pickedNumbers[2]}</td> 
                            <td>${s}s</td>
                            <td>${b}b</td>
                        </tr>`;
      // historyList.innerHTML += `<div class='history-item'>
      //                               <label>${pickedNumbers[0]}</label>
      //                               <label>${pickedNumbers[1]}</label>
      //                               <label>${pickedNumbers[2]}</label> 
      //                               <label>${s}s ${b}b</label>
      //                           </div>`;
      pickedNumbers = [];
      index = 0;
      playCnt += 1;
      handleRemoveInput();
    }, 300);

    return;
  }
}
for (let button of buttons) {
  button.addEventListener("click", function (e) {
    const { textContent } = e.target;
    handlePickedNum(textContent);
  });
}

document.addEventListener("keyup", function (e) {
  const pattern = /[0-9]/;
  const { key } = e;
  if (pattern.test(key)) {
    handlePickedNum(key);
  }
});

window.addEventListener("load", function () {
  handleStartGame();
});
