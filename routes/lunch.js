const express= require("express");
const router = express.Router();

const lunch = require("../data/lunch");

let contents = "<section>"
for(let i = 0; i < lunch.length; i++){
    contents += `<div style="margin:10px; overflow:scroll;"><a href=\"/lunch/${Object.keys(lunch[i])[0]}\">${Object.keys(lunch[i])[0]}</a></div>`
}
contents+="</section>"

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
                    bev = lunch.find(a => Object.keys(a)[0] === recipe)  
                    if(bev){
                        let ingredients ="<ul>"
                        let instructions ="<ol>"
                        for(let i = 0 ; i < bev[recipe][0]["ingredients"].length;i++){
                            ingredients +=  `<li>${bev[recipe][0]["ingredients"][i]}</li>`
                        }
                        for(let i = 0; i < bev[recipe][0]["instructions"].length;i++){
                            instructions += `<li>${bev[recipe][0]["instructions"][i]}</li>`
                        }
                        ingredients += "</ul>"
                        instructions += "</ol>"
                        data.content = `<div><h1>${recipe}</h1><h1>Ingredients</h1>${ingredients}  <h1>Directions</h1>${instructions}</div><footer>${bev[recipe][0]["source"]}</footer>`
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