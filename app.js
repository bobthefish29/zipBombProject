const express = require(`express`)
const app = express()
const fs = require(`fs`);


const readFile = (path)=>{
    return new Promise(
        (resolve, reject)=>
    {
        fs.readFile(path, `utf8`, (err, data) => {
            if (err) {
            reject(err)
        }
            else
            {
            resolve(data)
        }
        });
    })
}

var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
})

//Just so you can do "LocalHost" and it takes you to the page
app.get(`/`,(req,res)=>{
    res.sendFile(`${__dirname}/public/startpage.html`)
})

app.get('/highScore', async (req, res) => {
    var data = await readFile(`./data/highScore`);
    res.send(JSON.parse(data));
});


app.get('/highScoreList', async (req, res) => {
    res.sendFile(`${__dirname}/public/endscreen.html`)
});


app.post('/highScoreList', async (req, res) => { 
    var oldData =  await readFile(`./data/highScore`)
    var newData =  await JSON.parse(oldData)
    newData.push(req.body)
    const jsonString = JSON.stringify(newData);
    await fs.writeFile('./data/highScore', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
    } else {
            console.log('Successfully wrote file')
    }
    });
    res.send(jsonString);
});