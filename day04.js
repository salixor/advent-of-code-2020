const entries = require('./entries/day04.js');

const areArraysEqual = (a, b) => a.length === b.length && [...a].every(v => b.includes(v));
const areSetsEqual = (a, b) => a.size === b.size && [...a].every(v => b.has(v));

const rangeCheck = (v, min, max) => {
  const valueInt = parseInt(v);
  return min <= valueInt && valueInt <= max;
};

const yearCheck = (year, start, end) => {
  const isYear = year.match(/^\d{4}$/);
  return isYear && rangeCheck(year, start, end);
};

const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
const OPTIONAL_FIELDS = ['cid'];
const CHECK_FIELDS = new Set(REQUIRED_FIELDS.filter(f => !OPTIONAL_FIELDS.includes(f)));

const FIELDS_RULES = {
  byr: v => yearCheck(v, 1920, 2002),
  iyr: v => yearCheck(v, 2010, 2020),
  eyr: v => yearCheck(v, 2020, 2030),
  hgt: v => (v.match(/^\d+cm$/) && rangeCheck(v, 150, 193)) || (v.match(/^\d+in$/) && rangeCheck(v, 59, 76)),
  hcl: v => v.match(/^#(\d|[a-f]){6}$/),
  ecl: v => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
  pid: v => v.match(/^\d{9}$/),
  cid: v => true,
};

const passportsSplitted = entries.default.split('\n\n');
const passports = passportsSplitted.map(passport => {
  const passportFields = [].concat(...passport.split('\n').map(lines => lines.split(' ')));

  return passportFields.reduce((acc, field) => {
    const [key, value] = field.split(':');
    return { ...acc, [key]: value };
  }, {});
});

// STEP 1

const checkPassportValidityFlexible = passport => {
  const fields = Object.keys(passport);
  return areArraysEqual(REQUIRED_FIELDS, fields) || areSetsEqual(CHECK_FIELDS, new Set(fields));
};

console.log(passports.map(checkPassportValidityFlexible).filter(Boolean).length);

// STEP 2

const checkPassportValidityStrict = passport => {
  if (!checkPassportValidityFlexible(passport)) return false;
  return Object.entries(passport).every(([field, value]) => FIELDS_RULES[field](value));
};

console.log(passports.map(checkPassportValidityStrict).filter(Boolean).length);
