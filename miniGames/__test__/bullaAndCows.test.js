const data = require("./data/bullsAndCows");
const bullsAndCows = require("./services/bullsAndCowsService");

describe("bullAndCows Test", () => {
  beforeEach(() => {
    data.answer = [1, 2, 3];
  });

  test("Test print answer", () => {
    expect(bullsAndCows.printAnswer());
  });

  test("Test Non-duplicate three numbers", () => {
    expect(bullsAndCows.makeRandomNumbers());
    console.log(data.answer);
  });
});
