const seatsLayoutsEntry = require('./entries/day11.json');
let seatsLayout = seatsLayoutsEntry.map(line => line.split(''));

const FLOOR = '.';
const EMPTY_SEAT = 'L';
const OCCUPIED_SEAT = '#';

seatsLayout = seatsLayout.map(line => line.map(s => (s === FLOOR ? null : s)));

const DIRECTIONS = {
  TOP_LEFT: 'TOP_LEFT',
  TOP: 'TOP',
  TOP_RIGHT: 'TOP_RIGHT',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  BOTTOM_LEFT: 'BOTTOM_LEFT',
  BOTTOM: 'BOTTOM',
  BOTTOM_RIGHT: 'BOTTOM_RIGHT',
};

const getAtPosition = (layout, row, col) => {
  if (row >= 0 && col >= 0 && row < layout.length && col < layout.length) {
    return layout[row][col];
  }
  return null;
};

const getOnLineOfSight = (layout, row, col, direction) => {
  if (row < 0 || col < 0 || row >= layout.length || col >= layout.length) return null;
  switch (direction) {
    case DIRECTIONS.TOP_LEFT:
      return getAtPosition(layout, row - 1, col - 1) || getOnLineOfSight(layout, row - 1, col - 1, direction);
    case DIRECTIONS.TOP:
      return getAtPosition(layout, row - 1, col) || getOnLineOfSight(layout, row - 1, col, direction);
    case DIRECTIONS.TOP_RIGHT:
      return getAtPosition(layout, row - 1, col + 1) || getOnLineOfSight(layout, row - 1, col + 1, direction);
    case DIRECTIONS.LEFT:
      return getAtPosition(layout, row, col - 1) || getOnLineOfSight(layout, row, col - 1, direction);
    case DIRECTIONS.RIGHT:
      return getAtPosition(layout, row, col + 1) || getOnLineOfSight(layout, row, col + 1, direction);
    case DIRECTIONS.BOTTOM_LEFT:
      return getAtPosition(layout, row + 1, col - 1) || getOnLineOfSight(layout, row + 1, col - 1, direction);
    case DIRECTIONS.BOTTOM:
      return getAtPosition(layout, row + 1, col) || getOnLineOfSight(layout, row + 1, col, direction);
    case DIRECTIONS.BOTTOM_RIGHT:
      return getAtPosition(layout, row + 1, col + 1) || getOnLineOfSight(layout, row + 1, col + 1, direction);
  }
};

const neighbourSeats = (layout, i, j) => ({
  [DIRECTIONS.TOP_LEFT]: getAtPosition(layout, i - 1, j - 1),
  [DIRECTIONS.TOP]: getAtPosition(layout, i - 1, j),
  [DIRECTIONS.TOP_RIGHT]: getAtPosition(layout, i - 1, j + 1),
  [DIRECTIONS.LEFT]: getAtPosition(layout, i, j - 1),
  [DIRECTIONS.RIGHT]: getAtPosition(layout, i, j + 1),
  [DIRECTIONS.BOTTOM_LEFT]: getAtPosition(layout, i + 1, j - 1),
  [DIRECTIONS.BOTTOM]: getAtPosition(layout, i + 1, j),
  [DIRECTIONS.BOTTOM_RIGHT]: getAtPosition(layout, i + 1, j + 1),
});

const visibleSeats = (layout, i, j) =>
  Object.values(DIRECTIONS).reduce(
    (acc, direction) => ({ ...acc, [direction]: getOnLineOfSight(layout, i, j, direction) }),
    {}
  );

const operatePartOfProblem = (filterMethod, maxOccupied) => {
  let change = false;
  let seatsLayoutPart = seatsLayout.map(arr => arr.slice());
  do {
    let seatsLayoutCopy = seatsLayoutPart.map(arr => arr.slice());
    change = false;

    for (let i = 0; i < seatsLayoutPart.length; i++) {
      for (let j = 0; j < seatsLayoutPart[i].length; j++) {
        const currentSeat = seatsLayoutPart[i][j];
        if (currentSeat !== EMPTY_SEAT && currentSeat !== OCCUPIED_SEAT) continue;

        const filterSeats = filterMethod(seatsLayoutPart, i, j);
        const neighboursOccupied = Object.values(filterSeats).filter(v => v === OCCUPIED_SEAT).length;

        if (currentSeat === EMPTY_SEAT && !neighboursOccupied) {
          seatsLayoutCopy[i][j] = OCCUPIED_SEAT;
          change = true;
        } else if (currentSeat === OCCUPIED_SEAT && neighboursOccupied >= maxOccupied) {
          seatsLayoutCopy[i][j] = EMPTY_SEAT;
          change = true;
        }
      }
    }

    seatsLayoutPart = seatsLayoutCopy;
  } while (change);

  return seatsLayoutPart;
};

// PART 1

let seatsLayoutsPart1 = operatePartOfProblem(neighbourSeats, 4);
console.log([].concat(...seatsLayoutsPart1).filter(v => v === OCCUPIED_SEAT).length);

// PART 2

let seatsLayoutsPart2 = operatePartOfProblem(visibleSeats, 5);
console.log([].concat(...seatsLayoutsPart2).filter(v => v === OCCUPIED_SEAT).length);
