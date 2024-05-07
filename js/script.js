let current_tool = "";

function generateFields(){
    const field_parts = document.querySelector("field-parts");
    for(i=0; i<25; i++){
        const field_part = document.createElement("field-part");
        field_part.classList.add("grass");
        field_part.addEventListener("click", (event)=>{
            if(current_tool==="Labourer"){
                event.target.classList.add("farmland");
                event.target.classList.remove("grass");
            }
            else if(current_tool==="Arroser" && event.target.classList.contains("farmland")){
                event.target.classList.add("hydrated");
                setTimeout(function(){
                    event.target.classList.remove("hydrated");
                }, 10000);
            }
            else if(current_tool==="Semer" && event.target.classList.contains("farmland")){
                event.target.dataset.seed = 1;
            }
            else if(current_tool==="Moissonner"){
                if(event.target.dataset.seed==7){
                    let stock_wheat = document.getElementById("stock-wheat").innerHTML;
                    document.getElementById("stock-wheat").innerHTML = parseInt(stock_wheat) + 1;
                }
                event.target.dataset.seed = 0;
            }
        })
        field_parts.appendChild(field_part);
    }
}

function attachToolsEvent(){
    const begin_tools = document.querySelectorAll("tool");
    for(const item of begin_tools){

        item.addEventListener("click", (event)=>{
            const tools = document.querySelectorAll("tool");
            for(const tool of tools){
                tool.classList.toggle("active", tool===event.target);
            }
            current_tool = event.target.title;
        });
        
    }
}

function grow(){
    const field_parts = document.querySelectorAll("field-part");
    
    for(const field_part of field_parts){
        let seed = parseInt(field_part.dataset.seed);
        let probability = Math.random();

        if(seed==0){
            if(!field_part.classList.contains("hydrated")){
                if(probability<0.01){
                    field_part.dataset.seed = seed + 1;
                }
            }
        }
        else if(seed < 7){
            if(field_part.classList.contains("hydrated")){
                if(probability<0.3){
                    field_part.dataset.seed = seed + 1;
                }
            }else{
                if(probability<0.05){
                    field_part.dataset.seed = seed + 1;
                }
            }
            
        }
    }
}

function load(){
    generateFields();
    attachToolsEvent();
    setInterval(grow, 1000);
}


window.addEventListener("load", load);