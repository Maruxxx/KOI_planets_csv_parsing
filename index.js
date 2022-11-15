const {parse} = require('csv-parse');
const fs = require('fs');

// Array for collecting data from steam.
const habitablePlanets = [];

// Filtering function to arrange habitable planets on an array of objects.
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('cumulative_2022.11.14_17.37.43.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (c) => {
        if (isHabitablePlanet(c)) {
            habitablePlanets.push(c)
        }
    })
    .on('error', (err) => console.log(err))

    .on('end', () => {
        console.log(habitablePlanets);
        console.log(`There is ${habitablePlanets.length} habitable planets found!`);
    });