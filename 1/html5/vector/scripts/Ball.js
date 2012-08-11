var myCanvas = document.getElementById("main");
var graphics = myCanvas.getContext("2d");

function Ball(x, y, r, color)
{
	this.loc = new Vector(x, y);
	this.r = r;
	this.color = color;
	this.v = new Vector(0, 0);
}

Ball.prototype.run = function()
{
	this.loc.plus(v);
}

Ball.prototype.updata = function()
{
	var myCanvas = document.getElementById("main");
	var graphics = myCanvas.getContext("2d");
	
	var g = graphics;
	g.fillStyle = this.color;
	g.beginPath();
	g.arc(this.loc.x, this.loc.y, this.r, 0, Math.PI*2, true);
	g.closePath();
	g.fill();
	
	this.loc.plus(this.v);
}
