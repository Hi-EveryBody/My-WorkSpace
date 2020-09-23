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