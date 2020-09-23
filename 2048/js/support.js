//手机设备宽度
documentWidth = window.screen.availWidth;
//游戏main盒子宽度
gridContainerWidth = 0.9 * documentWidth;
//每个小盒子main_box宽度
cellSideLength = 0.18 * documentWidth;
//每个小盒子中间的间距
cellSpace = 0.04 * documentWidth;

function getNumberBackgroundColor(number) {
	switch (number) {
		case 2:
			return "#eee4da"
			break;
		case 4:
			return "#ede0c8"
			break;
		case 8:
			return "#f2b179"
			break;
		case 16:
			return "#f59563"
			break;
		case 32:
			return "#f67caf"
			break;
		case 64:
			return "#f65e3b"
			break;
		case 128:
			return "#edcf72"
			break;
		case 256:
			return "#edcc61"
			break;
		case 512:
			return "#9c0"
			break;
		case 1024:
			return "#33b5e5"
			break;
		case 2048:
			return "#09c"
			break;
		case 4096:
			return "#a6c"
			break;
		case 8192:
			return "#93c"
			break;
		default:
			break;
			return "black"
			break;
	}
}

function getNumberText(number) {
	switch (number) {
		case 2:
			return "小白"
			break;
		case 4:
			return "实习生"
			break;
		case 8:
			return "程序猿"
			break;
		case 16:
			return "工程师"
			break;
		case 32:
			return "主管"
			break;
		case 64:
			return "经理"
			break;
		case 128:
			return "总监"
			break;
		case 256:
			return "总经理"
			break;
		case 512:
			return "副总裁"
			break;
		case 1024:
			return "总裁"
			break;
		case 2048:
			return "CEO"
			break;
		case 4096:
			return "董事长"
			break;
		case 8192:
			return "你"
		default:
			return "我"
	}
}

function getNumberColor(number) {
	if (number <= 4) {
		return "#776e65"
	}
	return "#ded0c2"
}
//120
function noBlockHorizontl(row, coll, coll2, board) {
	for (var i = coll + 1; i < coll2; i++) {
		if (board[row][i] != 0) {
			return false;
		}
	}
	return true;
}

function noBlockVertival(col, row1, row2, board) {
	for (var i = row1 + 1; i < row2; i++) {
		if (board[i][col] != 0) {
			return false
		}
	}
	return true;
}
// 指定平移动画 fromX：开始时X坐标   fromY：开始时Y轴坐标
//toX：结束时X坐标    toY：结束时Y坐标 
function showMoveAnimation(fromX, fromY, toX, toY) {
	var numberCell = $("#number_cell_" + fromX + "_" + fromY);
	numberCell.animate({
		top: getPosTop(toX, toY),
		left: getPosLeft(toX, toY)
	}, 200)
}
// 修改分数
function updateScore(score) {
	$("#score").text(score)
}