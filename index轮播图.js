window.addEventListener("load",function(){
    const mainBanner = document.querySelector(".banner");
    const bannerEle = document.querySelector("#kinMaxShow");
    const imgEles =document.querySelectorAll("#kinMaxShow div");
    mainBanner.style.overflow="hidden";
    mainBanner.style.position="relative"
    bannerEle.style.width = (imgEles.length * 756)+"px"
    let ulEle = document.createElement("ul");
    ulEle.style.position="absolute";
    ulEle.style.right="0px";
    ulEle.style.bottom="10px";
    let current=-1;
    const firstliEle = document.createElement("li");
    firstliEle.style.cssText="width:15px;height:15px;margin-right:3px;background:red;float:left;cursor:pointer" 
    firstliEle.onclick=function(){
        run(0)
        current=0
    }
    ulEle.appendChild(firstliEle)
    for(let i=1;i<imgEles.length;i++){
        const liEle = document.createElement("li");
        liEle.style.cssText="width:15px;height:15px;margin-right:3px;background:#333;float:left;cursor:pointer"
        liEle.onclick=function(){
            run(-i)
            current=-i
        }
        ulEle.appendChild(liEle)
    }
    for(let i=0;i<imgEles.length;i++){
        imgEles[i].style.float="left";
        imgEles[i].setAttribute("index",i);
    }
    bannerEle.appendChild(ulEle);
    function run(n){
        bannerEle.style.marginLeft=(756*n)+"px"
        dotchange(Math.abs(n))
    }
    function dotchange(nn){
        const lis = document.querySelectorAll("#kinMaxShow ul li");
        for(let i=0;i<lis.length;i++){
            lis[i].style.background="#333"
        }
        lis[nn].style.background="red"
    }
    var timer = setInterval(function(){
        run(current);
        current=current-1
        if(current==-(imgEles.length)){
            current=0;
        }
    },5000)
})