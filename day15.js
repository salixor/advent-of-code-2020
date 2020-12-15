const startingNumbers = require('./entries/day15.json');

const algorithm = iterations => {
  let spokenNumbersWithLastTurns = new Map();
  let lastSaidNumber = null;
  let diffOfLastSpoken = null;

  for (let turn = 0; turn < iterations; ++turn) {
    let init = !!(turn < startingNumbers.length);
    lastSaidNumber = init ? startingNumbers[turn] : diffOfLastSpoken;

    const lastTurn = spokenNumbersWithLastTurns.get(lastSaidNumber);
    diffOfLastSpoken = lastTurn !== undefined ? turn - lastTurn : 0;
    spokenNumbersWithLastTurns.set(lastSaidNumber, turn);
  }
  return lastSaidNumber;
};

console.log(algorithm(2020));
console.log(algorithm(30000000));
