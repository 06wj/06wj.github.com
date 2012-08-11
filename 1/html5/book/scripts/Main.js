var fps = 30;
var time = 0;
var key = {};	

var myCanvas = document.getElementById("main");
var g = myCanvas.getContext("2d");

function main()
{
	init();
	
	setInterval("drawAll()", 1000/24);	//更新画面
	setInterval("updataAll()", 1000/fps);	//更新数据
}

function init()
{
	time = 0;	//时间
	key = [];	//按键信息数组
}

function loop()
{
	updataAll();
	drawAll();
}

function updataAll()
{
	
}


function drawAll()
{
	
}

document.onkeydown = function(e) 
{
        key[e.keyCode] = true;
}

document.onkeyup = function(e) 
{
        key[e.keyCode] = false;
}