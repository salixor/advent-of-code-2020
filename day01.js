const entries = require('./entries/day01.json');

const SUM_2020 = 2020;

const sumValues = arr => arr.reduce((acc, curr) => acc + curr, 0);
const prodValues = arr => arr.reduce((acc, curr) => acc * curr);

const doTheMagic = currentValues =>
  entries.map(value => {
    const values = [...currentValues, value];
    return {
      values,
      sum: sumValues(values),
      prod: prodValues(values),
    };
  });

// STEP 1

const listTwoProducts = entries.reduce((acc, curr) => acc.concat(...doTheMagic([curr])), []);

console.log(listTwoProducts.find(v => v.sum === SUM_2020).prod);

// STEP 2

const listThreeProducts = entries.reduce(
  (acc1, curr1) =>
    acc1.concat(
      ...entries.reduce(
        (acc2, curr2) => (curr1 + curr2 < SUM_2020 ? acc2.concat(...doTheMagic([curr1, curr2])) : acc2),
        []
      )
    ),
  []
);

console.log(listThreeProducts.find(v => v.sum === SUM_2020).prod);
