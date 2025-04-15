const express= require("express");
const router = express.Router();

const breakfasts = require("../data/breakfast");

let contents = "<section><h1 style=\"color:white;font-size:50px; -webkit-text-stroke: 0.5px black;\">Breakfast</h1>"
for(let i = 0; i < breakfasts.length; i++){
    contents += `<div style="margin:10px; overflow:scroll;"><a href=\"/breakfast/${Object.keys(breakfasts[i])[0]}\">${Object.keys(breakfasts[i])[0]}</a></div>`
}
contents += "</section>"

router.
    route("/").
        get((req,res)=>{
            const data ={
                content : contents,
                background: "breakfast_background(tikovka1355).jpg"
            }
            res.render("index",data)
        })

router.
    route("/:recipe").
        get((req,res)=>{
            const data ={content:"",
                        background:""
            }
            let recipe = req.params.recipe;
            if(req.params.recipe){
                    let food
                    recipe = req.params.recipe
                    food = breakfasts.find(a => Object.keys(a)[0] === recipe)  
                    if(bev){
                        let ingredients ="<ul>"
                        let instructions ="<ol>"
                        for(let i = 0 ; i < food[recipe][0]["ingredients"].length;i++){
                            ingredients +=  `<li>${food[recipe][0]["ingredients"][i]}</li>`
                        }
                        for(let i = 0; i < food[recipe][0]["instructions"].length;i++){
                            instructions += `<li>${food[recipe][0]["instructions"][i]}</li>`
                        }
                        ingredients += "</ul>"
                        instructions += "</ol>"
                        data.content = `<div><h1>${recipe}</h1><h1>Ingredients</h1>${ingredients}  <h1>Directions</h1>${instructions}`
                        data.footer = `<footer>${food[recipe][0]["source"]}</footer>`
                        data.background = `${JSON.stringify(bev[recipe][0]["url"])}`
                        res.render("recipes",data)
                    }else{
                        res.status(404).send("Recipe not found");
                    }
                
            }else{
                res.status(404).send("Recipe not found");
            }      
        })

router.route("/:recipe/download").get((req,res)=>{
    let food;
    let recipe = req.params.recipe
    let info = "Ingredients\n";
    info += "____________\n\n"

    food = breakfasts.find(a => Object.keys(a)[0] === recipe)  
    if(req.params.recipe){
        for(let i = 0; i< food[recipe][0]["ingredients"].length;i++){
            info += food[recipe][0]["ingredients"][i];
            info += "\n";
        }
        info += "____________\n";
        info += "Instructions\n";
        info += "____________\n\n"
        for(let i = 0; i< food[recipe][0]["instructions"].length;i++){
            info += food[recipe][0]["instructions"][i];
            info += "\n";
        }

        info += `chef ${food[recipe][0]["source"]}`
        
        res.setHeader("Content-Disposition", `attachment; filename="${recipe} recipe.txt"`);
        res.setHeader("Content-Type", "text/plain");
        res.send(info);
        
    }else{
        res.json("missing")
    }
})
module.exports = router; 