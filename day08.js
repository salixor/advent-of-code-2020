const entry = require('./entries/day08.json');

const ACCUMULATOR = 'acc';
const JUMP = 'jmp';
const NO_OPERATION = 'nop';

const code = entry.map(line => {
  const [operation, argument] = line.split(/\s/);
  return {
    operation,
    argument: parseInt(argument),
  };
});

const compute = (instructions, { depth = 0, acc = 0, visited = [], canMutate = null } = {}) => {
  if (depth === instructions.length) return acc;
  if (visited.includes(depth)) return canMutate !== null ? null : acc;

  const { operation, argument } = instructions[depth];
  visited = [...visited, depth];
  depth = depth + 1;

  let potentialNextExec = null;
  switch (operation) {
    case ACCUMULATOR:
      potentialNextExec = compute(instructions, { depth, acc: acc + argument, visited, canMutate });
      break;
    case JUMP:
      potentialNextExec = compute(instructions, { depth: depth + argument - 1, acc, visited, canMutate });
      if (potentialNextExec === null && !!canMutate) {
        potentialNextExec = compute(instructions, { depth, acc, visited, canMutate: false });
      }
      break;
    case NO_OPERATION:
      potentialNextExec = compute(instructions, { depth, acc, visited, canMutate });
      if (potentialNextExec === null && !!canMutate) {
        potentialNextExec = compute(instructions, { depth: depth + argument - 1, acc, visited, canMutate: false });
      }
      break;
  }
  return potentialNextExec;
};

console.log(compute(code)); // PART 1
console.log(compute(code, { canMutate: true })); // PART 2
