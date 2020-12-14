const initializationProgram = require('./entries/day14.js').default.split('\n');
const { sum, stringReduce } = require('./utils/reducers');

const formatMask = mask => mask.split(' = ')[1].trim();
const isMask = line => !!line.match(/^mask =/);

const formatOperation = operation => {
  const [, address, value] = operation.match(/^mem\[(\d+)\] = (\d+)$/);
  return {
    address: parseInt(address),
    value: parseInt(value, 10),
  };
};

const formatToBinary = v => v.toString(2).padStart(mask.length, '0');

let memory = {};

// PART 1

const applyMaskToValue = (mask, value) => {
  const binaryVal = formatToBinary(value);
  let finalValueString = stringReduce(mask, (acc, m, i) => acc + (m === 'X' ? binaryVal[i] : m));
  return parseInt(finalValueString, 2);
};

memory = {};
let mask = null;

initializationProgram.forEach(line => {
  if (isMask(line)) {
    mask = formatMask(line);
  } else {
    let { address, value } = formatOperation(line);
    memory[address] = applyMaskToValue(mask, value);
  }
});
console.log(Object.values(memory).reduce(sum));

// PART 2

const computeAllPotentialMasks = mask => {
  if (!mask.includes('X')) return mask;
  return [computeAllPotentialMasks(mask.replace('X', '0')), computeAllPotentialMasks(mask.replace('X', '1'))].flat();
};

const applyMaskToAddress = (mask, value, originMask) => {
  const binaryAddr = formatToBinary(value);
  let finalAddressString = stringReduce(mask, (acc, m, i) => acc + (originMask[i] === '0' ? binaryAddr[i] : m));
  return parseInt(finalAddressString, 2);
};

memory = {};
let originMask = null;
let potentialMasks = [];

initializationProgram.forEach(line => {
  if (isMask(line)) {
    originMask = formatMask(line);
    potentialMasks = computeAllPotentialMasks(originMask);
  } else {
    let { address, value } = formatOperation(line);
    let decodedAddresses = potentialMasks.map(mask => applyMaskToAddress(mask, address, originMask));
    decodedAddresses.forEach(decodedAddress => (memory[decodedAddress] = value));
  }
});
console.log(Object.values(memory).reduce(sum));
