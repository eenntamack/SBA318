const express= require("express");
const router = express.Router();

const desserts = require("../data/desserts");

let contents = "<section><h1 style=\"color:white;font-size:50px; -webkit-text-stroke: 1px black;\">Desserts</h1>"
for(let i = 0; i < desserts.length; i++){
    contents += `<div style="margin:10px; overflow:scroll;"><a href=\"/desserts/${Object.keys(desserts[i])[0]}\">${Object.keys(desserts[i])[0]}</a></div>`
}
contents += "</section>"

router.
    route("/").
        get((req,res)=>{
            const data ={
                content : contents,
                background: "desserts_background(congerdesign).jpg"
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
                    food = desserts.find(a => Object.keys(a)[0] === recipe)  
                    if(food){
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
                        data.content = `<div><h1>${recipe}</h1><h1>Ingredients</h1>${ingredients}  <h1>Directions</h1>${instructions}</div>`
                        data.footer = `<footer>${food[recipe][0]["source"]}</footer>`
                        data.background = `${JSON.stringify(food[recipe][0]["url"])}`
                        data.category = 'desserts'
                        data.recipe = `${recipe}` 
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

    food = desserts.find(a => Object.keys(a)[0] === recipe)  
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