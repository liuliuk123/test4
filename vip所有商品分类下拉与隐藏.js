window.addEventListener("load",function(){
    const item_click = document.querySelectorAll(".helpNav dt");
    const item_show = document.querySelectorAll(".helpNav dd");
    let flageMenu=false
    for(let i=0;i<item_click.length;i++){
        item_click[i].onclick=function(){
            if(!flageMenu){
                item_show[i].style.display="block"
                flageMenu=true
            } else {
                item_show[i].style.display="none"
                flageMenu=false
            }
        }
    }
    const titleNav = document.querySelector(".pntLeft .Title")
    const InPorNav = document.querySelector(".pntLeft .Title .InPorNav")
    let flagNav = false;
    titleNav.addEventListener("click",function(){
        if(!flagNav){
            InPorNav.style.display="block"
            flagNav = true
        } else {
            InPorNav.style.display="none"
            flagNav = false
        }
        
    })
})