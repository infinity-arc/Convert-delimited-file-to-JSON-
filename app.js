const fs = require('fs');
const process = require('process');

const args = process.argv;


fs.readFile(args[2], 'utf8', (err, result) => {
    if (err) {
        console.log(err);
    } else {};
    console.log(result);


    const array = result.split(/(?<=.)[\r\n]+(?=.)/u).map((line) => {
        const values = line.trim().split(/\t/u)
            .map(value => value.replace(/^"|"$/gu, ''));
        const keys = ['Code', 'Longitude', 'Latitude', 'Name'];
        return Object.fromEntries(keys.map((key, index) => [key, values[index]]));
    });


    const json = JSON.stringify(array, null, '  ');
    fs.writeFile(args[3] + ".json", json, 'utf8', (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('File written successfully.');
        }
    });
});