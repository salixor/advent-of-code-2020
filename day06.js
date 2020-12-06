const entries = require('./entries/day06.js').default;

const union = (arrays = []) => new Set([].concat(...arrays));
const intersection = (arrays = []) => new Set(arrays.reduce((a, c) => a.filter(i => c.includes(i))));

const sumSizes = arr => arr.reduce((acc, curr) => acc + curr.size, 0);

const groups = entries.split('\n\n');
const groupAnswers = groups.map(group => {
  const personsAnswers = group.split('\n').map(s => s.split(''));

  return {
    union: union(personsAnswers),
    intersection: intersection(personsAnswers),
  };
});

// PART 1

console.log(sumSizes(groupAnswers.map(a => a.union)));

// PART 2

console.log(sumSizes(groupAnswers.map(a => a.intersection)));
