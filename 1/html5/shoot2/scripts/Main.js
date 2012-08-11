var fps = 30;
var time = 0;
var key = {};	

var enemys, bombs, bullets, objs;

var myCanvas = document.getElementById("main");
var g = myCanvas.getContext("2d");

function main()
{
	init();
	
	setInterval("drawAll()", 1000/24);	//更新画面
	setInterval("updataAll()", 1000/fps);	//更新数据
	//setInterval("loop()", 1000/fps);	//更新数据
}

function init()
{
	time = 0;	//时间
	key = [];	//按键信息数组

	enemys = [];//敌人数组
	bombs = [];//爆炸数组
	bullets = [];//子弹数组
	objs = [enemys, bombs, bullets];//所有物体数组
}

function loop()
{
	updataAll();
	drawAll();
}

function updataAll()
{
	time ++;
	
	player.updata();
	updataObjs();
	
	//gameStart.updata();
	addEnemy();
}


function drawAll()
{
	ground.draw();
	ground2.draw();
	player.draw();
	drawObjs();
	drawScore();
}



function drawScore()
{
	g.save();
	g.fillStyle = "#fff";
	g.fillText("Made By 06wj", 10, 10);
	g.fillText("SCORE: "+ player.score, 400, 10);
	g.restore();
}

function updataObjs()
{
	var i, j, obj;
	for(i = 0; i < 3; i ++)
	{
		obj = objs[i];
		{
			for(j = 0;j < obj.length;j ++)
			{
				obj[j].updata();
				if(obj[j].isDie)
				{
					obj[j] = null;
					obj.splice(j, 1);
					j --;
				}
			}
		}
	}
}

function drawObjs()
{
	var i, j, obj;
	for(i = 0; i < 3; i ++)
	{
		obj = objs[i];
		{
			for(j = 0;j < obj.length;j ++)
			{
				obj[j].draw();
			}
		}
	}
}

function addEnemy()
{
	var enemy;
	
	if(time % 50 === 1) 
	{
		enemy = new Enemy(tool.random(50, 450), tool.random(50, 450));
		enemys.push(enemy);
	}
}

document.onkeydown = function(e) 
{
        e.preventDefault();;
		key[e.keyCode] = true;
}

document.onkeyup = function(e) 
{
        key[e.keyCode] = false;
}