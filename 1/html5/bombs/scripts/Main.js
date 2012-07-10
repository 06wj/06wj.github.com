var fps = 30;
var time = 0;
var key = {};	

var enemys, bombs, bullets, bombss;

var myCanvas = document.getElementById("main");
var g = myCanvas.getContext("2d");

function main()
{
	init();
	
	//setInterval("drawAll()", 1000/24);	//更新画面
	setInterval("updataAll()", 1000/fps);	//更新数据
}

function init()
{
	bombs = [];//爆炸数组
}

function loop()
{
	updataAll();
	drawAll();
}

function updataAll()
{
	updata();
	
}

function updata()
{	
	gameStart.updata();
	g.fillRect(0, 0, 500, 500);
	for(j = 0;j < bombs.length;j ++)
	{
		bombs[j].draw();
		bombs[j].updata();
		if(bombs[j].isDie)
		{
			bombs[j] = null;
			bombs.splice(j, 1);
			j --;
		}
	}
}
