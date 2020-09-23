var nowpage = 0;

$(document).ready(function() {
	//获取手机设备宽高
	var width = window.innerWidth;
	var height = window.innerHeight;
	//设置最外层大盒子的宽高
	$(".content").width(width);
	$(".content").height(4 * height);
	//设置每个小页面的宽高
	$(".page").width(width);
	$(".page").height(height);
	$(".content").swipe({
			swipe: function(event, direction, distance, duration,
				fingerCount) {
				if (direction == "up") {
					nowpage++;
				} else if (direction == "down") {
					nowpage--;
				}
				if (nowpage > 3) {
					nowpage = 3;
				}
				if (nowpage < 0) {
					nowpage = 0;
				}
				$(".content").animate({
					top: nowpage * -100 + "%"
				}, {
					duration: 500,
					//当滑动页面完成是用pagechange方法
					complete: pageChange()
				})
			}
		})
		//判断页面是第一页刚加载是执行if条件
	if (nowpage == 0) {
		$(".page1_building").fadeIn(1000, function() {
			$(".page1_avatar").animate({
				width: 70 + '%'
			}, {
				duration: 1000
			})
		})
	}
})

function pageChange() {
	//判断当滑动到第二页时所做的操作
	if (nowpage == 1) {
		$(".page2_bg").fadeIn(1000, function() {
			$(".page2_farm").fadeIn(1000, function() {
				$(".page2_it").fadeIn(1000)
			})
		})
	}
	//判断当滑动到第三页时所做的操作
	if (nowpage == 2) {
		$(".page3_et").fadeIn(2000)
		$(".page3_lt").fadeIn(3000)
			//車跑
		$(".page3_bus").animate({
				left: -100 + '%'
			}, {
				duration: 2000
			})
			//人追
		$(".page3_me").animate({
			right: 70 + '%'
		}, {
			duration: 3000,
			//场景一淡出，场景二淡入
			complete: function() {
				$(".page3_et").fadeOut(500)
				$(".page3_lt").fadeOut(500)
				$(".page3_me").fadeOut(500)
				$(".page3_station").fadeOut(500)
				$(".page3_wall").fadeIn(1000, function() {
					$(".page3_ta").fadeIn(1000)
					$(".page3_space").animate({
						width: 30 + '%'
					}, {
						duration: 1000
					})
					$(".page3_where").animate({
						width: 60 + '%'
					}, {
						duration: 1000
					})
				})
			}
		})
	}
}

function lightSwitch(light) {
	light.src = "img/lightOn.png";
	$(".page4_offBg").fadeOut(1000)
	$(".page4_title").fadeOut(1000, function() {
		$(".page4_onBg").fadeIn(1000)
		$(".page4_wky").fadeIn(1500)
	})
}

function musicPlayer(musicBtn) {
	//alert("点击了按钮")
	//通过getElementById的方式找到audio标签
	var player = document.getElementById("music");
	//判断音乐是否暂停
	if (player.paused) {
		//如果音乐暂停则播放音乐
		player.play();
		musicBtn.src = "img/musicBtn.png"
	} else {
		//如果音乐播放则暂停音乐
		player.pause();
		musicBtn.src = "img/musicBtnOff.png"
	}
}