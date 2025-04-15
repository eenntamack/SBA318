const express = require("express");
const fs = require("fs")
const bodyParser = require("body-parser");
const beverage = require("./routes/beverage");
const breakfast = require("./routes/breakfast")
const dessert = require("./routes/desserts");
const lunch = require("./routes/lunch");
const maincontent = require("./shell/maincontent")

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use(express.static("./styles"))
app.use(express.static("./pages"))
app.use(express.static("./images"))
app.use(express.static("./scripts"))

app.use("/beverage",beverage)
app.use("/breakfast",breakfast)
app.use("/desserts",dessert)
app.use("/lunch",lunch)
const html = [
    "<p style=\"font-size:50px;\">testing</p>",
    "<p style=\"font-size:50px;\">debugging</p>",
    "<p style=\"font-size:50px;\">rendering</p>",
    "<div> Hello world </div>"
]

app.engine("page", (filePath, data, callback) => {  // Change options to data
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        // Use data.content and data.src instead of options
        const rendered = content.toString()
            .replace("#content#", data.content || "")
            .replace("#background#", data.background || "")
            .replace("#footer#",data.footer || "")
            .replace("#category#", data.category || "")
            .replace("#recipe#", data.recipe || "")
        return callback(null, rendered);
    });
});

app.set("views", "./pages");
app.set("view engine", "page");


let num = 0
app.get("/",(req,res)=>{
    const data = {content:   maincontent["main"] + "<footer style=\"color:white; position:relative; bottom:-100px; diplay:flex; flex-direction:column; justify-content:center;\"><h1>Disclaimer</h1><p>All recipes are used by their respective owners from allrecipes.com</footer>",
                  background: "ingredients_background_homepage(Daria-Yakovleva).jpg"
    }

    res.render("index",data);
})

app.get("/links",(req,res)=>{
            link = [{
                info: "recipes will be listed by categories",
                categories : [
                    {
                        href:"/beverage",
                        rel:"beverages",
                        type:"GET"
                    },  
                    {
                        href:"/desserts",
                        rel:"desserts",
                        type:"GET"
                    },  
                    {
                        href:"/lunch",
                        rel:"lunch",
                        type:"GET"
                    },
                    {
                        href:"/breakfast",
                        rel:"breakfast",
                        type:"GET"
                    }, 
                ]  
                },
                {
                info: "Recipe will be returned",
                recipe: [
                    {
                        href:"/beverages/:recipe",
                        rel:"recipe",
                        type:"GET"
                    },
                    {
                        href:"/desserts/:recipe",
                        rel:"recipe",
                        type:"GET"
                    },
                    {
                        href:"/lunch/:recipe",
                        rel:"recipe",
                        type:"GET"
                    },
                    {
                        href:"/breakfast/:recipe",
                        rel:"recipe",
                        type:"GET"
                    }
                ]
                },
                {
                    info:"Search recipe by ingredient,\"not perfect, cases where queries like 'of' will return ingredient strings that contain 'of' word\"",
                    recipe_by_ingredient:[
                        {
                            href:"/category?ingredient=",
                            rel: "recipe",
                            type: "GET"
                        }
                    ]
                }
            ]

            res.json(link);
        })


app.listen(port, ()=>{
    console.log(`listening on localhost:${port}`);
})