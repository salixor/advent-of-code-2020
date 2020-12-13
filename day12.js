const navigationInstructions = require('./entries/day12.json').map(instruction => ({
  action: instruction[0],
  value: parseInt(instruction.slice(1)),
}));

const NORTH = 'N';
const SOUTH = 'S';
const EAST = 'E';
const WEST = 'W';
const LEFT = 'L';
const RIGHT = 'R';
const FORWARD = 'F';

const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

const turn = (direction, value, action) => {
  const turnValue = action === LEFT ? -value : value;
  const indexDirection = DIRECTIONS.indexOf(direction);
  const newIndex = 4 + indexDirection + turnValue / 90;

  return DIRECTIONS[newIndex % 4];
};

const shipNavigation = {
  [NORTH]: ({ x, y, direction }, value) => ({ x, y: y + value, direction }),
  [SOUTH]: ({ x, y, direction }, value) => ({ x, y: y - value, direction }),
  [EAST]: ({ x, y, direction }, value) => ({ x: x + value, y, direction }),
  [WEST]: ({ x, y, direction }, value) => ({ x: x - value, y, direction }),
  [LEFT]: ({ x, y, direction }, value) => ({ x, y, direction: turn(direction, value, LEFT) }),
  [RIGHT]: ({ x, y, direction }, value) => ({ x, y, direction: turn(direction, value, RIGHT) }),
  [FORWARD]: ({ x, y, direction }, value) => shipNavigation[direction]({ x, y, direction }, value),
};

const rotateWaypoint = (wx, wy, value, wpRotation) => {
  const mirrored = value === 180;
  if (mirrored) return { wx: -wx, wy: -wy };

  const toTheRight = (value === 90 && wpRotation === RIGHT) || (value === 270 && wpRotation === LEFT);
  const toTheLeft = (value === 90 && wpRotation === LEFT) || (value === 270 && wpRotation === RIGHT);
  if (toTheRight) return { wx: wy, wy: -wx };
  if (toTheLeft) return { wx: -wy, wy: wx };

  return { wx, wy };
};

const shipNavigationWithWaypoint = {
  [NORTH]: ({ x, y, wx, wy }, value) => ({ x, y, wx, wy: wy + value }),
  [SOUTH]: ({ x, y, wx, wy }, value) => ({ x, y, wx, wy: wy - value }),
  [EAST]: ({ x, y, wx, wy }, value) => ({ x, y, wx: wx + value, wy }),
  [WEST]: ({ x, y, wx, wy }, value) => ({ x, y, wx: wx - value, wy }),
  [LEFT]: ({ x, y, wx, wy }, value) => ({ x, y, ...rotateWaypoint(wx, wy, value, LEFT) }),
  [RIGHT]: ({ x, y, wx, wy }, value) => ({ x, y, ...rotateWaypoint(wx, wy, value, RIGHT) }),
  [FORWARD]: ({ x, y, wx, wy }, value) => ({ x: x + wx * value, y: y + wy * value, wx, wy }),
};

const computeNavigation = (method, entry) =>
  navigationInstructions.reduce((acc, { action, value }) => method[action](acc, value), entry);
const computeManhattanDistance = ({ x, y }) => Math.abs(x) + Math.abs(y);

// PART 1

const part1Navigation = computeNavigation(shipNavigation, { x: 0, y: 0, direction: EAST });
console.log(computeManhattanDistance(part1Navigation));

// PART 2

const part2Navigation = computeNavigation(shipNavigationWithWaypoint, { x: 0, y: 0, wx: 10, wy: 1 });
console.log(computeManhattanDistance(part2Navigation));
