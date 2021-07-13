const fs = require('fs')
const path = require('path')
fs.watch(path.join(__dirname, `./dist`),(eventType, fileName)=>{
const fileThatWasChange = path.join(__dirname, `./dist`, fileName);
const content = fs.readFileSync(fileName)
const parseData = JSON.parse(content.toString());
switch(parseData.type)
{
    case 'gas':
        fs.appendFile(
            path.join(__dirname, `./audit/gas.csv`, `\n${parseData.date},${parseData.type}`))
            break;

        case 'water':
        fs.appendFile(
            path.join(__dirname, `./audit/gas.csv`, `\n${parseData.data}, ${parseData.name}`))
            break;
}

}