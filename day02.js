const entries = require('./entries/day02.json');

const regex = /^(\d+)-(\d+) ([a-zA-Z]{1}): ([a-zA-Z]*)$/;

const formattedEntries = entries.map(s => {
  const [, min, max, letter, password] = s.match(regex);

  const parsedMin = parseInt(min, 10);
  const parsedMax = parseInt(max, 10);
  const foundLetters = password.match(new RegExp(letter, 'g'));

  const firstPositionLetter = password.charAt(parsedMin - 1);
  const lastPositionLetter = password.charAt(parsedMax - 1);

  return {
    min: parsedMin,
    max: parsedMax,
    letter,
    letterCount: foundLetters ? foundLetters.length : 0,
    firstPositionLetter,
    lastPositionLetter,
    password,
  };
});

// STEP 1

const validEntriesBasic = formattedEntries.filter(obj => obj.min <= obj.letterCount && obj.letterCount <= obj.max);

console.log(validEntriesBasic.length);

// STEP 2

const validEntriesAdvanced = formattedEntries.filter(
  obj => (obj.firstPositionLetter === obj.letter) ^ (obj.lastPositionLetter === obj.letter)
);

console.log(validEntriesAdvanced.length);
