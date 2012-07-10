var balls = [];
var circen = new Vector(150, 150);
var g = new Vector(0, -.7);
var d = new Vector(0, .7);
var scale = .99;
var num = 500;
var a = 0x9933ff;
var b = 0xff66ff;
var obj=/aaa/;
var fps = 24;

var txt = "";

function main()
{
	init();
	setInterval("loop()",1000/fps);	
}

function init()
{
	var myCanvas = document.getElementById("ground");
	var graphics = myCanvas.getContext("2d");
	
	var g = graphics;
	g.fillStyle = "#000";
	g.beginPath();
	g.arc(150, 150, 150, 0, Math.PI*2, true);
	g.closePath();
	g.fill();
	
	addBalls(num);
}

function loop()
{
	var g = graphics;
	g.clearRect(0, 0,300, 300);
	
	var l = balls.length;
	var i;
	for(i = 0;i < l; i++)
	{
		balls[i].updata();
	}
	
	updataBalls()
}

function addBalls(length)
{
	var i, x, y, r, color, temp;
	
	x = 0;
	y = 3;
	temp = 100 / length;
	
	for(var i = 0; i < length; i ++)
	{
		x += temp;
		y = 50;
		r = 1;	
		color = "#fff";	
		var c;
		
		var ball = new Ball(100 + x, y, r, color);
		balls.push(ball);
		
		
		
		if(i < length / 2) 
		{
			ball.loc.y = 220;
			if(a > 0xffff00 ) a -= 0x0a ;
			else a -= 0x0a00;
			
			c ="#".concat(a.toString(16));
		}
		
		else 
		{
			
			if(b > 0xffff00 ) b -= 0x0a ;
			else b -= 0x0a00;
			
			c ="#".concat(b.toString(16));
		}

		ball.color = c;
	}
}

function updataBalls()
{
	var length = balls.length;
	var l1 = parseInt(length / 2);
	var ball,v,i,ang;
	
	for(i = 0; i < l1 ; i ++)
	{
		ball = balls[i];
		
		if( ball.loc.minusNew(circen).getLength() >= (150 - ball.r) )
		{
			v = ball.loc.minusNew(circen);
			v.setLength(150 - ball.r);
			v.plus(circen);

			ball.loc.reset(v.x, v.y);
			
			ang = ball.loc.minusNew(circen).angleBetween(ball.v);
		
			ball.v.negate();
			ball.v.scale(scale);
			
			
			if(ball.loc.x < 150) ball.v.rotate( 2 *ang );	
			else ball.v.rotate( -2 *ang );
			
		}
		ball.v.plus(d);
	}
	
	for(i = l1; i < length ; i ++)
	{
		ball = balls[i];
		
		if( ball.loc.minusNew(circen).getLength() >= (150 - ball.r) )
		{
			v = ball.loc.minusNew(circen);
			v.setLength(150 - ball.r);
			v.plus(circen);

			ball.loc.reset(v.x, v.y);
			
			ang = ball.loc.minusNew(circen).angleBetween(ball.v);
		
			ball.v.negate();
			ball.v.scale(scale);
			
			
			if(ball.loc.x < 150) ball.v.rotate( -2 *ang );	
			else ball.v.rotate( 2 *ang );
			
		}
		ball.v.plus(g);
	}
	
}