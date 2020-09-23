//原生写法，第一次加载时执行该function
//window.onload=function(){
//	
//}

//JQuery是一个JS库，封装了繁琐而常用的功能，可以轻松实现复杂而炫酷的效果
//基本用法：$(selecter).action();
//用Jquery方式打开网页时执行该function
$(document).ready(function() {
	console.log("ready")
		//0*9<=Math.random(*9)<1*9  取0-8之间的随机整数
		//Math.ceil() 向上取整
		//Math.floor() 向下取整
		//Math.round() 四舍五入
	setInterval(function() {
		//随机出现地鼠
		var x = Math.floor(Math.random() * 9)
		var content = document.getElementById("content")
		var img = content.children[x]
		img.src = "img/2.gif"
		//随机出现草坪
		var x = Math.floor(Math.random() * 9)
		var content = document.getElementById("content")
		var img = content.children[x]
		img.src = "img/5.jpg"
	}, 1000);
})
var score = 0;
function beat(img){
	var str=img.src;
	if(str.charAt(str.length-5)=='2'){
		score++;
		img.src="img/5.jpg"
		$("p").text("得分: " + score + "分")
	}
}








