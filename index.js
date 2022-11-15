// Modules that we are using in this project.
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

const csv_files = ['./csv/cumulative_2022.11.14_17.37.43.csv'];

// Streaming and parsing data from csv.
csv_files.forEach(file => {
    
    fs.createReadStream(file)
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
        console.log(habitablePlanets.map(p => {
            return p['kepler_name']
        }));
        console.log(`${habitablePlanets.length} habitable planets found!`);
    });

});
