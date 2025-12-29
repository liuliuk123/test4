window.addEventListener("load",function(){
    const clickEle = document.querySelector(".vipUp");
    clickEle.onclick=function(){
        const addressEle = document.querySelector(".address");
        addressEle.style.display="block"
    }
})