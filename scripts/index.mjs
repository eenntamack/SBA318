document.addEventListener("DOMContentLoaded",()=>{

    let main = document.getElementsByTagName("main")[0];
    let div = document.getElementsByTagName("div")[0];

    div.addEventListener("mouseenter",()=>{
        main.style.backdropFilter = "blur(10px)"
    })

    div.addEventListener("mouseleave",()=>{
        main.style.backdropFilter = "blur(0px)"
    })
})