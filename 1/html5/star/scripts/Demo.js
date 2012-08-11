var fps = 50;//帧频
var num = 1;//大星星数量
var stars = [];//储存大星星的数组

function main()
{
	init();
	setInterval("loop()",1000/fps);	
}

function init()
{
	var myCanvas = document.getElementById("ground");
	var graphics = myCanvas.getContext("2d");
	graphics.fillStyle = "#000000";
	graphics.fillRect(0, 0, 800, 600);//清屏
	
	addStar(num);//加大星星
}

function loop()//循环
{
	var myCanvas = document.getElementById("main");
	var graphics = myCanvas.getContext("2d");
	
	var i, l, n, star;
	graphics.clearRect(0, 0, 800, 600);
	
	n = stars.length;//大星星数量
	
	for(i = 0 ; i < n ; i ++)
	{
		star = stars[i];
		star.updata();
		star.draw();
		
			
		if(star.loc.x - star.r< 0 || star.loc.x + star.r> 800) //碰墙反弹
		{
			star.loc.minus(star.v);
			star.v.x *= - .99;
		}
		
		if(star.loc.y + star.r > 600 || star.loc.y - star.r < 0) 
		{
			star.loc.minus(star.v);
			star.v.y *= - .99;
		}
	}
}


function addStar(n)
{
	for(var i = 0 ; i < n ; i ++)
	{
		var star = new Star(90, 90, 10, 3, "#f96");//大星星
		star.big = true;//设置为大星星
		star.g = new Vector(0, .2);
		star.v = new Vector(5, -2);
		stars.push(star);
	}
}




