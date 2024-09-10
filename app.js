const express = require(`express`)
const app = express()
const fs = require(`fs`);
const hbs = require(`hbs`);
app.set('view engine', 'hbs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.get('/favicon.ico', (req, res) => res.status(204));
hbs.registerPartials(__dirname + '/views/partials', function (err) {});


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

var port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log("Server Running at Localhost:3000")
})

//Just so you can do "LocalHost" and it takes you to the page
app.get(`/`,(req,res)=>{
    const filePath = path.join(__dirname, `public`, `startpage.html`)
    res.sendFile(filePath);
})



app.get('/game', (req, res) => {
    res.sendFile(`${__dirname}/public/game.html`)
});

app.get('/highScoreList', async (req, res) => {
    var highScore = await readFile(`./data/highScore.json`)
    console.log(highScore)
    res.send(JSON.Parse(highScore))
});

app.post('/highScoreList', async (req, res) => {
    var highScore = await readFile(`./data/highScore.json`)
    highScore = JSON.parse(highScore)
    highScore.push(req.body)
    highScore = JSON.stringify(highScore)
    await fs.writeFile('./data/highScore.json', highScore, err => {
        if (err) {
            console.log('Error writing file', err)
    }else {
            console.log('Successfully wrote file')
    }
    });
    res.send(highScore);
});

