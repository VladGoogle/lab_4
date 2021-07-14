/*const fs = require('fs')
const path = require('path')
fs.watch(path.join(__dirname, `./dist`),(eventType, fileName)=>{
const fileThatWasChange = path.join(__dirname, `./dist`, fileName);
const content = fs.readFileSync(fileName)
const parseData = JSON.parse(content.toString());
switch(parseData.type)
{
    case 'gas':
        fs.appendFile(
            path.join(__dirname, `./audit/gas.csv`, `\n${parseData.date},${parseData.type}, ${parseData.name}, ${parseData.data}`))
            break;

        case 'water':
        fs.appendFile(
            path.join(__dirname, `./audit/water.csv`, `\n${parseData.data}, ${parseData.name}, ${parseData.type}, ${parseData.date}`))
            break;
}

})
*/

const fs = require('fs')
const path = require('path')
fs.watchFile(path.join(__dirname, `/dist/1.json`), (eventType, fileName) => {
    const fileThatWasChange = path.join(__dirname, `/dist/1.json`);
    console.log('2323423432', fileThatWasChange);
    if (fs.existsSync(path.join(__dirname, `/dist/1.json`))) {
        const content = fs.readFileSync(path.join(__dirname, `/dist/1.json`))
        const parseData = JSON.parse(content.toString());
        fs.unlinkSync(path.join(__dirname, `/dist/1.json`));
        switch (parseData.type) {
            case 'gas':
                console.log(parseData)
                fs.appendFile(
                    path.join(__dirname, `./audit/gas.csv`), `\n${parseData.name},${parseData.data},${parseData.type},${parseData.date}`, (err) => {
                        if (err) {
                            throw new Error(err)
                        }
                    }
                )
                break;

            case 'water':
                fs.appendFile(
                    path.join(__dirname, `./audit/water.csv`), `\n${parseData.name},${parseData.data},${parseData.type},${parseData.date}`, (err) => {
                        if (err) {
                            throw new Error(err)
                        }
                    })
                break;
        }
        require(`./analyser.js`)
    }
}
)