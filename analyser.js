

const fs = require('fs');
const readline = require('readline');
const path = require('path');

function analyse(arrData) {
    const userMap = arrData.reduce((accObj, currentItem) => {
        if(!accObj[currentItem.Username]) {
            accObj[currentItem.Username] = []
        }
        accObj[currentItem.Username].push(`${currentItem.Date} - ${currentItem.Data}`)
        return accObj
    }, {})
    console.log('User Map', userMap)
}

var readGas = new Promise((resolve, reject) => {
    const rlGas = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, './audit/gas.csv'))
    })
    .on('line', (line)=>{
        const row = line.split(',');
        dataGas.push({
            Username: row[0],
            Data: row[1],
            Type: row[2],
            Date: row[3]
        });
    })
    .on('close', () => {
        resolve(dataGas);
    });

})

var readWater = new Promise((resolve, reject) => {
    const rlWater = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, './audit/water.csv'))
    })
    .on('line', (line)=>{
        const row = line.split(',');
        dataWater.push({
            Username: row[0],
            Data: row[1],
            Type: row[2],
            Date: row[3]
        });

    })
    .on('close', () => {
        resolve();
    });
})

const dataGas =[];
const dataWater =[];

Promise.all([readGas, readWater]).then(() => {             
    analyse(dataGas);
    analyse(dataWater);
});
