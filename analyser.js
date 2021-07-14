const fs = require('fs');
const readline = require('readline');
const path = require('path');


var readGas = new Promise((resolve, reject) => {
    const rlGas = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, './audit/gas.csv'))
    })
    .on('line', (line)=>{
        var row = line.split(',');
        dataGas.push(row);
    })
    .on('close', () => {
        resolve(dataGas);
    });

})

var readWater = new Promise((resolve, reject) => {
    let username;
    const rlWater = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, './audit/water.csv'))
    })
    .on('line', (line)=>{
        var row = line.split(',');
        let objWater = {
            Username: row[0],
            Data: row[1],
            Type: row[2],
            Date: row[3]
        }
        username = objWater.Username;
        console.log(objWater)
        dataWater.push(objWater);

    })
    .on('close', () => {
        resolve();
    });
    let result = {
        username,
        data: []
    }
    let filteredWaterData = dataWater.filter(record => record.Username === result.username);
    filteredWaterData.forEach(record => {
        result.data.push(`${record.Date} - ${record.Data}`)
    })
    console.log(result)
})

var dataGas =[];
var dataWater =[];

Promise.all([readGas, readWater]).then(() => {              //ждём чтения обоих файлов
    /*analysedGas=analyse(dataGas, 'gas');                    //данные из файла gas разбираем по пользователям
    analysedWater=analyse(dataWater, 'water');              //данные из файла water разбираем по пользователям
    var mergedData = mergeData(analysedGas, analysedWater); //объеденяем данные из двух файлов в один массив
    printData(mergedData);  */                                //выводим данные
});