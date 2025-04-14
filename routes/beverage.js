const express= require("express");
const router = express.Router();

const beverages = require("../data/beverage");

let contents = ""
for(let i = 0; i < beverages.length; i++){
    contents += `<div><a href=\"/beverage/${Object.keys(beverages[i])[0]}\">${Object.keys(beverages[i])[0]}</a></div>`
}


router.
    route("/").
        get((req,res)=>{
            const data ={
                content : contents,
                background: "lunch_background(Lisy_).jpg"
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
                    let bev
                    recipe = req.params.recipe
                    bev = beverages.find(a => Object.keys(a)[0] === recipe)  
                    if(bev){
                        let structure ="<ol>"
                        for(let i = 0 ; i < bev[recipe][0]["ingredients"].length;i++){
                            structure +=  `<li>${bev[recipe][0]["ingredients"][i]}</li>`
                        }
                        structure += "</ol>"
                        data.content = `${structure}`
                        data.background = `${JSON.stringify(bev[recipe][0]["url"])}`
                        res.render("recipes",data)
                    }else{
                        res.status(404).send("Recipe not found");
                    }
                
            }else{
                res.status(404).send("Recipe not found");
            }      
        })
module.exports = router; 