window.onload = function() {
	game.init();
}
$(document).ready(function() {
	//获取手机设备宽高
	var width = window.innerWidth;
	var height = window.innerHeight;
})
var game = {
	//盒子
	box: document.getElementById("box"),
	//初始化函数
	init: function() {
		//初始化box内容
		game.box.innerHTML = "";
		//动态创建一个p标签和一个div盒子
		var oTitle = document.createElement("p");
		var oStart = document.createElement("div");
		//给标签起class名称
		oTitle.className = "title";
		//给p标签插入文本内容
		oTitle.innerHTML = "打飞机v1.0-大哥版"
		oStart.className = "start";
		oStart.innerHTML = "<p>简单</p><p>一般</p><p>困难</p><p style='color:red;font-weight:bold;'>大哥附体</p>";
		//将oTitle,oScroll,oStart添加到box盒子中间
		game.box.appendChild(oTitle);
		game.box.appendChild(oStart);
		var oP = oStart.getElementsByTagName('p');
		for (var i = 0; i < oP.length; i++) {
			oP[i].index = i;
			oP[i].onclick = function(e) {
				//获取当前点击点的XY坐标
				var ev = {
						x: e.clientX,
						y: e.clientY
					}
					//根据当前index值表示游戏模式
				game.model = this.index;
				//调用游戏开始
				game.start(ev)
					//调用积分系统
			}
		}
	},
	//游戏参数
	diff: [
		[200, 1000, 0.2],
		[400, 400, 0.4],
		[400, 200, 0.8],
		[30, 100, 1]
	],
	scroll: function() {
		game.oScroll = document.createElement("span");
		game.oScroll.className = "scroll";
		game.box.appendChild(game.oScroll);
		game.Num = 0;
		game.oScroll.innerHTML = "0";
	},
	//游戏开始
	start: function(ev) {
		game.box.innerHTML = '';
		game.plane(ev);
		game.scroll()
	},
	//处理战机操作
	plane: function(ev) {
		//动态创建img标签
		var oPlane = document.createElement("img");
		oPlane.className = "plane";
		//指定图片为战机
		oPlane.src = "img/plane.png";
		game.box.appendChild(oPlane);
		var pT = game.box.offsetTop + 10 + oPlane.clientHeight / 2;
		var pL = game.box.offsetLeft + 10 + oPlane.clientWidth / 2;
		//指定战机的left跟top属性将游戏刚开始进入时战机位置在鼠标点击的位置上
		oPlane.style.left = ev.x - pL + "px";
		oPlane.style.top = ev.y - pT + "px";
		//战机到最下面的临界值
		var tMax = game.box.clientHeight - oPlane.clientHeight;
		//战机最左边跟最右边的临界值
		var lMin = -oPlane.clientWidth / 2;
		var rMax = game.box.clientWidth - oPlane.clientWidth / 2;
		//监听鼠标移动事件
		document.onmousemove = function(e) {
				var left = e.clientX - pL;
				var top = e.clientY - pT;
				//战机上下临界值判断
				if (top < 0) {
					top = 0;
				} else if (top > tMax) {
					top = tMax;
				}
				//战机左右临界值判断
				if (left < lMin) {
					left = lMin
				} else if (left > rMax) {
					left = rMax
				}
				oPlane.style.left = left + "px";
				oPlane.style.top = top + "px";
			}
			//发射子弹
		oPlane.bTime = setInterval(function() {
				//每隔多少时间发射一颗子弹（根据游戏模式动态设置子弹生成的速度）
				game.bullet(oPlane)
			}, game.diff[game.model][0])
			//发射敌机
		oPlane.eTime = setInterval(function() {
			game.enemy(oPlane)
		}, game.diff[game.model][1])
	},
	//敌机
	enemy: function(oPlane) {
		var oEnemy = document.createElement("img")
		oEnemy.className = "enemy";
		oEnemy.src = "img/enemy.png";
		var oEnemySrc = oEnemy.src;
		game.box.appendChild(oEnemy);
		oEnemy.style.top = -oEnemy.clientHeight + 'px'
		oEnemy.style.left = Math.random() * (game.box.clientWidth - oEnemy.clientWidth) + "px"
			// 敌机开始位置
		var eTBegin = -oEnemy.clientHeight;
		// 敌机结束位置
		var eTMax = game.box.clientHeight;
		// 敌机的速度
		var eSpeed = Math.random() * game.diff[game.model][2] + 0.2
			//敌机不断出现
		oEnemy.animate = setInterval(function() {
			if (!oEnemy.parentNode) {
				clearInterval(oEnemy.animate)
				return false;
			}
			eTBegin += eSpeed;
			if (eTBegin > eTMax) {
				eTBegin = eTMax;
				oEnemy.style.top = eTBegin + 'px'
					//当移出屏幕外时清理定时器
				clearInterval(oEnemy.animate);
				//当移出屏幕外时销毁敌机
				oEnemy.parentNode.removeChild(oEnemy)
			} else {
				oEnemy.style.top = eTBegin + 'px';
			}
		})
		oEnemy.time = setInterval(function() {
			var eT = parseInt(oEnemy.style.top);
			var eB = parseInt(oEnemy.style.top) + oEnemy.clientHeight;
			var eL = parseInt(oEnemy.style.left);
			var eR = parseInt(oEnemy.style.left) + oEnemy.clientWidth;
			//找到所有的图片
			var oImg = document.getElementsByTagName("img");
			for (var i = 0; i < oImg.length; i++) {
				//判断图片的class名称为bullet时所需操作(子弹时)
				if (oImg[i].className == "bullet") {
					var oT = parseInt(oImg[i].style.top);
					var oB = parseInt(oImg[i].style.top) + oImg[i].clientHeight;
					var oL = parseInt(oImg[i].style.left);
					var oR = parseInt(oImg[i].style.left) + oImg[i].clientWidth;
					//碰撞检测
					if (oR > eL && oL < eR && eB > oT && eT < oB) {
						//敌机变成爆炸图片
						oEnemy.src = "img/boom.png";
						//子弹消失
						oImg[i].parentNode.removeChild(oImg[i]);
						//计分
						game.Num += 1000;
						game.oScroll.innerHTML = game.Num;
						//隔了300ms后爆炸图片消失
						oEnemy.dismiss = setInterval(function() {
							//当子弹打中敌机后，敌机已经被移除则不在执行重复移除代码
							if (!oEnemy.parentNode) {
								clearInterval(oEnemy.dismiss)
								return false;
							}
							oEnemy.parentNode.removeChild(oEnemy)
						}, 300)

						clearInterval(oEnemy.time);
					}
				}
			}
			var pT = parseInt(oPlane.style.top);
			var pB = parseInt(oPlane.style.top) + oPlane.clientHeight;
			var pL = parseInt(oPlane.style.left);
			var pR = parseInt(oPlane.style.left) + oPlane.clientWidth;
			//当敌机与战机发生碰撞
			if (pR > eL && pL < eR && eB > pT && eT < pB) {
				oEnemy.src = "img/boom.png";
				oPlane.src = "img/boom2.png";
				document.onmousemove = function() {
					return false;
				}
				setTimeout(function() {
						if (!oPlane.parentNode) {
							return false;
						}
						oPlane.parentNode.removeChild(oPlane)
					}, 300)
					//清理不断生成子弹的定时器
				clearInterval(oPlane.bTime)
					//清理不断生成敌机的定时器
				clearInterval(oPlane.eTime)
					//清理碰撞检测
				clearInterval(oEnemy.time);
				setTimeout(function() {
					game.over();
				}, 1000)
			}
		})
	},
	//游戏结束
	over: function() {
		var overScroll = game.oScroll.innerHTML;
		game.box.innerHTML = '';
		var model, rank;
		switch (game.model) {
			case 0:
				model = "初级模式"
				if (overScroll == 0) {
					rank = "0分太菜了吧"
				} else if (overScroll < 10000) {
					rank = "菜鸡"
				} else if (overScroll < 100000) {
					rank = "菜"
				} else if (overScroll < 500000) {
					rank = "再高点,骚年"
				} else if (overScroll > 500000) {
					rank = "下一关,去吧,骚年"
				}
				break;
			case 1:
				model = "中级模式"
				if (overScroll == 0) {
					rank = "睿智吗骚年？"
				} else if (overScroll < 10000) {
					rank = "用脚玩的吗？"
				} else if (overScroll < 50000) {
					rank = "吃饱了再来吧!"
				} else if (overScroll < 100000) {
					rank = "小伙,有点东西"
				} else if (overScroll > 100000) {
					rank = "走吧,走吧"
				}
				break;
			case 2:
				model = "高级模式"
				if (overScroll == 0) {
					rank = "你妈喊你回家吃饭"
				} else if (overScroll < 10000) {
					rank = "吃奶的力气呢？"
				} else if (overScroll < 20000) {
					rank = "在使点劲"
				} else if (overScroll < 50000) {
					rank = "成功渡劫"
				} else if (overScroll > 50000) {
					rank = "飞仙吧,骚年"
				}
				break;
			case 3:
				model = "大哥模式"
				if (overScroll == 0) {
					rank = "有大哥还玩这吊样？"
				} else if (overScroll < 50000) {
					rank = "吃屎吧你"
				} else if (overScroll < 500000) {
					rank = "你就是个弟弟"
				} else if (overScroll < 1000000) {
					rank = "终于像个人了"
				} else if (overScroll > 1000000) {
					rank = "闲鱼"
				}
				break;
		}
		var oTip = document.createElement("div");
		var tTitle = document.createElement("p");
		var tScroll = document.createElement("p");
		var pScroll = document.createElement("p");
		var tModel = document.createElement("p");
		var pModel = document.createElement("p");
		var tRank = document.createElement("p");
		var pRank = document.createElement("p");

		var reStart = document.createElement("input");

		tTitle.className = "tTitle";
		oTip.className = "oTip";
		tScroll.className = "tScroll";
		pScroll.className = "pScroll";
		tModel.className = "tModel";
		pModel.className = "pModel";
		tRank.className = "tRank";
		pRank.className = "pRank";
		reStart.className = "reStart"
		var author = document.createElement("span");
		author.className = "author";

		tTitle.innerHTML = "GAME OVER"
		tScroll.innerHTML = "您本次飞机大赛得分为:"
		pScroll.innerHTML = overScroll + "分";
		tModel.innerHTML = '游戏模式:'
		pModel.innerHTML = model;
		tRank.innerHTML = '荣获称号:'
		pRank.innerHTML = rank;
		author.innerHTML = 'Power By -Bluz(QQ:1044196746)'

		reStart.id = "reStart";
		reStart.type = "button";
		reStart.value = "重新开始";

		oTip.appendChild(tTitle);
		oTip.appendChild(tScroll);
		oTip.appendChild(pScroll);
		oTip.appendChild(tModel);
		oTip.appendChild(pModel);
		oTip.appendChild(tRank);
		oTip.appendChild(pRank);
		oTip.appendChild(reStart);
		game.box.appendChild(oTip);
		game.box.appendChild(author);

		//点击重新开始按钮调用game.init方法进入重新开始页面
		reStart.onclick = game.init;
	},
	//子弹 bullet
	bullet: function(oPlane) {
		var oBullet = document.createElement("img");
		oBullet.className = "bullet";
		oBullet.src = "img/bullet.png";
		var bL = parseInt(oPlane.style.left) + oPlane.clientWidth / 2 - oBullet.clientWidth / 2;
		var bT = parseInt(oPlane.style.top) - oBullet.clientHeight;
		//指定子弹生成的位置
		oBullet.style.left = bL + 'px';
		oBullet.style.top = bT + 'px';
		//将子弹添加到box盒子中
		game.box.appendChild(oBullet);
		var bTMin = -oBullet.clientHeight;
		oBullet.animate = setInterval(function() {
			if (!oBullet.parentNode) {
				clearInterval(oPlane.animate)
				return false;
			}
			//子弹的速度
			bT -= 8;
			//判断临界值 挡子弹移动出屏幕外边是所做的操作
			if (bT < bTMin) {
				bT = bTMin;
				oBullet.style.top = bT + "px"
					//清理子弹移动定时器
				clearInterval(oBullet.animate)
					//当移出屏幕外销毁敌机
				oBullet.parentNode.removeChild(oBullet)
			} else {
				oBullet.style.top = bT + "px"
			}
		}, 30)
	}
}