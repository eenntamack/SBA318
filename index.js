const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static("./styles"))

const html = [
    "<p style=\"font-size:50px;\">testing</p>",
    "<p style=\"font-size:50px;\">debugging</p>",
    "<p style=\"font-size:50px;\">rendering</p>",
    "<div> Hello world </div>"
]
let num = 0
app.get("/",(req,res)=>{
    res.write(html[2]);
    //note reloading the page DOES not stop the interval, it stacks the interval's innner funcitons 2 fold
    //stoppinng the server with revert the interval's function to the original state.
    setInterval(()=>{
        //implement a system where a user can request 
        res.write(`<p style="background-color:rgb(${Math.max(255 - num,0)},${Math.max(255 - (num * 2),0)},${Math.max(255 - (num * 3),0)}); font-size:40px;">${num}</p>`);
        num += 1;
    },1000)
    
    //res.write("testing")
    //res.end()

    
    
    //res.send(html[0]);
    //res.write("testing")
    //res.end()
})

app.listen(port, ()=>{
    console.log(`listening on localhost:${port}`);
})