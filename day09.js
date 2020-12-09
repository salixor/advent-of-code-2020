const numbers = require('./entries/day09.json');

const PREVIOUS_NUMBERS_TO_CONSIDER = 25;

const findSumInPreviousNumbers = (list, index) => {
  if (index < PREVIOUS_NUMBERS_TO_CONSIDER) return;
  const numberAtIndex = list[index];
  const slicedNumbers = list.slice(index - PREVIOUS_NUMBERS_TO_CONSIDER, index);

  const firstNumberToGetSumAtIndex = slicedNumbers.find(number => slicedNumbers.includes(numberAtIndex - number));
  return firstNumberToGetSumAtIndex;
};

const findContiguousSetWhichSumsToNumber = (list, wantedNumber) => {
  let numbersToSum = [];

  for (const [index, number] of list.entries()) {
    if (number > wantedNumber) continue;

    let sum = number;
    numbersToSum = [];

    for (const nextNumber of list.slice(index + 1)) {
      sum += nextNumber;
      numbersToSum.push(nextNumber);
      if (sum > wantedNumber) break;
      if (sum === wantedNumber) return numbersToSum;
    }
  }
};

// PART 1

let sumFound = null;
let currentIndex = PREVIOUS_NUMBERS_TO_CONSIDER;

do {
  sumFound = findSumInPreviousNumbers(numbers, currentIndex);
  currentIndex += 1;
} while (!!sumFound);

const firstInvalidNumber = numbers[currentIndex - 1];
console.log(firstInvalidNumber);

// PART 2

const numbersToSumForInvalid = findContiguousSetWhichSumsToNumber(numbers, firstInvalidNumber);
const min = Math.min.apply(null, numbersToSumForInvalid);
const max = Math.max.apply(null, numbersToSumForInvalid);
console.log(min + max);
