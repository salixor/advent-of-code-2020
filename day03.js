const entry = require('./entries/day03.js');

const OPEN_SQUARE = '.';
const TREE = '#';
const START_POSITION = { x: 1, y: 1 };

const formattedEntry = entry.default.split('\n');
const MAX_COL_LENGTH = formattedEntry[0].length;

const computeSlope = (startPosition, pattern) => {
  const startParams = {
    position: startPosition,
    path: [],
  };

  return formattedEntry.reduce((acc, curr, i) => {
    const { path, position } = acc;
    if (position.y - 1 !== i) return acc;

    return {
      path: [...path, curr[(position.x - 1) % MAX_COL_LENGTH]],
      position: {
        x: position.x + pattern.right,
        y: position.y + pattern.down,
      },
    };
  }, startParams).path;
};

const prodValues = arr => arr.reduce((acc, curr) => acc * curr);
const countNumberOfTrees = path => path.filter(c => c === TREE).length;

// STEP 1

const patternStep1 = {
  right: 3,
  down: 1,
};

const pathStep1 = computeSlope(START_POSITION, patternStep1);

console.log(countNumberOfTrees(pathStep1));

// STEP 2

const patternsStep2 = [
  { right: 1, down: 1 },
  patternStep1,
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const pathsStep2 = patternsStep2.map(pattern => computeSlope(START_POSITION, pattern));

console.log(prodValues(pathsStep2.map(countNumberOfTrees)));
