const adaptersJoltagesRatings = require('./entries/day10.json');

adaptersJoltagesRatings.sort((a, b) => a - b);

const builtInAdapterJoltageRating = Math.max.apply(null, adaptersJoltagesRatings) + 3;
const allAdaptersRatings = [0, ...adaptersJoltagesRatings, builtInAdapterJoltageRating];

// PART 1

const ratingsDifferences = allAdaptersRatings.slice(1).reduce((acc, curr, index) => {
  const previousRating = adaptersJoltagesRatings[index - 1] || 0;
  return [...acc, curr - previousRating];
}, []);

const oneJoltDifferencesCount = ratingsDifferences.filter(v => v === 1).length;
const threeJoltDifferencesCount = ratingsDifferences.filter(v => v === 3).length;
console.log(oneJoltDifferencesCount * threeJoltDifferencesCount);

// PART 2

let pathsCounts = allAdaptersRatings.map((_, i) => (i === 0 ? 1 : 0));
for (let i = 0; i < pathsCounts.length; i++) {
  for (let j = i - 3; j < i; j++) {
    const ratingsDiff = allAdaptersRatings[i] - allAdaptersRatings[j];
    pathsCounts[i] += ratingsDiff <= 3 ? pathsCounts[j] : 0;
  }
}
const totalPathsCount = pathsCounts[pathsCounts.length - 1];
console.log(totalPathsCount);
