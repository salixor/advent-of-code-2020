const boardingPasses = require('./entries/day05.json');

const FRONT = 'F';
const BACK = 'B';
const LEFT = 'L';
const RIGHT = 'R';

const ROWS_RANGE = { start: 0, end: 127 };
const COLS_RANGE = { start: 0, end: 7 };

const reduceRange = (startRange, rowOrColInfo) => {
  let range = { ...startRange };
  rowOrColInfo.forEach(char => {
    const middle = ~~((range.end - range.start) / 2);
    if (char === FRONT || char === LEFT) {
      range = { start: range.start, end: range.start + middle };
    } else if (char === BACK || char === RIGHT) {
      range = { start: range.end - middle, end: range.end };
    }
  });
  return range;
};

const checkSeatRow = pass => {
  const rowInfo = pass.substring(0, 7).split('');
  const range = reduceRange(ROWS_RANGE, rowInfo);
  return range.end;
};

const checkSeatColumn = pass => {
  const colInfo = pass.substring(7, 10).split('');
  const range = reduceRange(COLS_RANGE, colInfo);
  return range.end;
};

const computeSeatId = pass => {
  const row = checkSeatRow(pass);
  const column = checkSeatColumn(pass);
  return row * 8 + column;
};

const seatIds = boardingPasses.map(computeSeatId);
seatIds.sort((a, b) => a - b);

// PART 1

const maxSeatId = Math.max.apply(null, seatIds);
console.log(maxSeatId);

// PART 2

const mySeat = seatIds.find((id, index) => id + 1 !== seatIds[index + 1] && index < seatIds.length - 1) + 1;
console.log(mySeat);
