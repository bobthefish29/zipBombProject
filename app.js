const express = require(`express`)
const app = express()
const fs = require(`fs`);



var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
})




app.get(`/`,(req,res)=>{
    res.sendFile(`${__dirname}/public/startpage.html`)

})