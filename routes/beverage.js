const express= require("express");
const router = express.Router();
const fs = require("fs");
const beverages = require("../data/beverage");
const { match } = require("assert");

let contents = "<section style=\"overflow:scroll; margin:auto;\"><h1 style=\"color:white; font-size:50px; -webkit-text-stroke: 0.5px black;\">Beverages</h1><div style=\"margin:10px; display:flex; flex-direction:column;justify-content:center;\">"
for(let i = 0; i < beverages.length; i++){
    contents += `<a href=\"/beverage/${Object.keys(beverages[i])[0]}\">${Object.keys(beverages[i])[0]}</a>`
}
contents += "</div></section>"

router.
    route("/").
        get((req,res)=>{
            const data ={
                content : contents,
                background: "beverage_background(Thomas Mühl).jpg",
            }
            //res.render("index",data)
            let search = "";
            if(req.query.ingredient){
                let findIngredient = req.query.ingredient;
                let matchingRecipes = [];
                for(const recipe of beverages){
                    const recipeName = Object.keys(recipe)[0];
                    const ingredients = recipe[recipeName][0].ingredients;
                    for (const ingredient of ingredients) {
                        if (ingredient.toLowerCase().includes(findIngredient)) {
                            recipeExists = matchingRecipes.some((r) => Object.keys(r)[0] === recipeName);
                            if(!recipeExists){
                                matchingRecipes.push(recipe);
                            }
                            
                        }
                    }
                }
                search += "<div style=\"overflow:scroll; display:flex; flex-direction:column; justify-content:center;\">"
                if(matchingRecipes.length > 0){
                    for (let i = 0; i < matchingRecipes.length; i++) {
                        const recipeName = Object.keys(matchingRecipes[i])[0];
                        search+= `<a href="beverage/${recipeName}">${recipeName}</a>`
                    }
                    search+="</div>"
                    data.content = search;
                    data.background = "beverage_background(Thomas Mühl).jpg";
                    res.render("index",data)
                }else{
                    res.status(404).send("No recipes have the provided ingredient.");
                }
            }else{
                res.render("index",data)
            }
        })

router.
    route("/:recipe").
        get((req,res)=>{
            const data ={
                content:"",
                background:""
            }
            let recipe = req.params.recipe;
            if(req.params.recipe){
                    let food
                    recipe = req.params.recipe
                    food = beverages.find(a => Object.keys(a)[0] === recipe)  
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
            
                        data.category = 'beverage'
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

    food = beverages.find(a => Object.keys(a)[0] === recipe)  
    if(req.params.recipe){
        for(let i = 0; i< food[recipe][0]["ingredients"].length;i++){
            info += food[recipe][0]["ingredients"][i];
            info += "\n";
        }
        info += "____________\n";
        info += "Instructions\n";
        info += "____________\n\n"
        for(let i = 0; i< food[recipe][0]["instructions"].length;i++){
            info += `${i + 1}. ${food[recipe][0]["instructions"][i]}`;
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