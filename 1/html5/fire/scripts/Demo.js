var stars = [];

var scale = .3;

var fps = 50;

var width = 800;
var height = 600;
var half = width / 2;


var circen = new Vector(half, half);

function main()
{
	init();
	setInterval("loop()",1000/fps);	
	setInterval("addStar()",33);	
	setInterval("addStar()",33);	
}

function init()
{
	var myCanvas = document.getElementById("ground");
	var graphics = myCanvas.getContext("2d");
	graphics.fillStyle = "#000000";
	graphics.fillRect(0, 0,width, height);
	updataStars();
}

function loop()
{
	var i, l;
	graphics.clearRect(0, 0,width, height);
	updataStars();
	
}

function addStar()
{
	var r, n, color;
	
	r = 3//Math.random()*10 + 5;
	n = 3//Math.random()*5 + 5;
	color = randomColor();
	
	var star = new Star(half, 10, r, n, color);
	stars.push(star);
}

function updataStars()
{
	
	var length = stars.length;
	var star,v,i,ang;
	
	for(i = 0; i < length ; i ++)
	{
		star = stars[i];
		star.updata();
		
		if(star.loc.x < 0 || star.loc.x > width) 
		{
			//star.loc.minus(star.v);
			//star.v.x *= - scale;
		}
		
		if(star.loc.y > height) 
		{
			star.loc.minus(star.v);
			star.v.y *= - scale;
		}
		
		if(star.die()) 
		{
			stars.splice(i, 1);
			i --;
		}
	}
}








