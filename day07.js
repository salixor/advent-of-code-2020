const bagageRules = require('./entries/day07.json');

const parseBagString = s => {
  if (s.trim() === 'no other bags') return null;
  const [, count, bag] = /^(\d*)([a-zA-Z ]+)bags?$/.exec(s.trim());
  return {
    count: count ? parseInt(count) : 1,
    bag: bag.trim(),
  };
};

const bagsTree = bagageRules.map(rule => {
  const [parent, children] = rule.replace('.', '').split('contain');
  return {
    parent: parseBagString(parent),
    children: children.split(',').map(parseBagString).filter(Boolean),
  };
});

// PART 1

const getBagNames = arr => Array.from(new Set(arr.map(({ parent }) => parent.bag)));

const filterBagsThatCanContainBag = bagName => bagsTree.filter(i => i.children.find(({ bag }) => bag === bagName));

const computeBagsWhichCanContain = bagName => {
  let names = [];
  let allNames = [];

  let bags = filterBagsThatCanContainBag(bagName);

  do {
    names = getBagNames(bags);
    allNames.push(names);
    bags = [].concat(...names.map(filterBagsThatCanContainBag));
  } while (names.length !== 0);

  return new Set([].concat(...allNames));
};

const bagsThatCanHaveAShinyGold = computeBagsWhichCanContain('shiny gold').size;
console.log(bagsThatCanHaveAShinyGold);

// PART 2

const findBagInfoByName = bagName => bagsTree.find(i => i.parent.bag === bagName);

const computeCountOfBagsThatGoIn = bagName => {
  const foundInTree = findBagInfoByName(bagName);
  const bagsThatGoIn = foundInTree && foundInTree.children;
  return bagsThatGoIn.reduce((acc, curr) => curr.count + curr.count * computeCountOfBagsThatGoIn(curr.bag) + acc, 0);
};

const countBagsAShinyBagCanContain = computeCountOfBagsThatGoIn('shiny gold');
console.log(countBagsAShinyBagCanContain);
