const data = require("../data/bullsAndCows");

module.exports = {
  printAnswer() {
    console.log(`answer: ${data.answer}`);
  },

  makeRandomNumbers() {
    let idx = 0;
    while (idx !== 3) {
      let current = Math.floor(Math.random() * 10); // 0 - 9
      if (data.answer.indexOf(current) !== -1) continue;
      data.answer[idx] = current;
      idx += 1;
    }
  },
};
