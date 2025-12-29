window.addEventListener("load",function(){
    const item_click = document.querySelectorAll(".flList li");
    const item_content = document.querySelectorAll(".frProList");
    for(let j=0;j<item_content.length;j++){
        item_content[j].style.display="none"
    }
    item_content[0].style.display="block"
    for(let i=0;i<item_click.length;i++){
        item_click[i].addEventListener("click",function(){
            for(let j=0;j<item_content.length;j++){
                item_content[j].style.display="none"
            }
            item_content[i].style.display="block"
        })
    }
})