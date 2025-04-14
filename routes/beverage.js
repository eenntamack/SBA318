const express= require("express");
const router = express.Router();
const app = express();
const fs = require("fs");

const beverages = require("../data/beverage");

app.engine("page", (filePath, data, callback) => {  // Change options to data
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Use data.content and data.src instead of options
        const rendered = content.toString()
            .replace("#content#", data.content || "")
            .replace("#background#", data.background || "")
        return callback(null, rendered);
    });
});

app.use(express.static("./images"))

app.set("views", "./pages");
app.set("view engine", "page");
let contents = ""
for(let i = 0; i < beverages.length; i++){
    contents += `<div>${Object.keys(beverages[i])[0]}</div>`
}


router.
    route("/").
        get((req,res)=>{
            const data ={
                content : contents,
                background: "beverage_background(Thomas Mühl).jpg"
            }
            res.render("index",data)
        })


module.exports = router;