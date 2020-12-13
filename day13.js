const timetable = require('./entries/day13.js').default;
let [departingTimestamp, buses] = timetable.split('\n');
departingTimestamp = parseInt(departingTimestamp);
buses = buses.split(',').map(bus => (bus === 'x' ? null : parseInt(bus)));

// PART 1

let busIDToAirport = null;
let currentTimestamp = departingTimestamp;

while (!busIDToAirport) {
  busIDToAirport = buses.find(bus => !!bus && currentTimestamp % bus === 0);
  currentTimestamp++;
}

console.log((currentTimestamp - 1 - departingTimestamp) * busIDToAirport);

// PART 2

let [firstBus, ...restOfBuses] = buses;
let timestamp = 0;

restOfBuses.forEach((bus, offset) => {
  if (!bus) return;
  while (true) {
    if ((timestamp + offset + 1) % bus === 0) {
      firstBus *= bus;
      break;
    }
    timestamp += firstBus;
  }
});

console.log(timestamp);
