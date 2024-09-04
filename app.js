const express = require(`express`)
const app = express()
const fs = require(`fs`);



var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
})



//Just so you can do "LocalHost" and it takes you to the page
app.get(`/`,(req,res)=>{
    res.sendFile(`${__dirname}/public/startpage.html`)

})