window.addEventListener("load",function(){
	const li = document.querySelectorAll(".InPorNav li");
	const li_ul = document.querySelectorAll(".chilInPorNav");
	for(let i=0;i<li.length;i++){
		li[i].addEventListener("mouseenter",function(){
			for(let j=0;j<li.length;j++){
				li_ul[j].style.display="none"
			}
			li_ul[i].style.display="block"
		})
		li[i].addEventListener("mouseout",function(){ 
			li_ul[i].style.display="none"
		})
	}
})