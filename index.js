const readLine = require('readline');
const fs = require("fs")
const path = require('path');
const rl = readLine.createInterface({
    output:process.stdout,
    input:process.stdin
})

function askSync(q){
    return new Promise((resolve,reject)=>{
        rl.question(q, (data)=>{
            console.log(data)
        if(false)
        {
            reject(newError('Not pass'))
        }
        resolve(data)
    });
});
};

async function asker()
{
    let name = await askSync("What is your Name?")
    let data = await askSync("What data?") // 6 digit
    let type = await askSync("Gas or water?")
    let date = await askSync("What date?")
    rl.close();
    let result = {
        name, data, type, date: new Date()
    }

     
    fs.writeFileSync(path.join(__dirname, `./dist/${Date.now()}answer.json`), JSON.stringify(result), ()=> console.log('written'))

}
asker()