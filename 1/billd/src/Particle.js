function Particle(x, y, r)
{
	this.loc = new Vector(x, y);
	this.r = r||5;
	this.v = new Vector(0, 0);
	this.a = new Vector(0, .7);
	this.isDie = false;
	this.time = 0;
	this.dieTime = 60;
}

Particle.prototype.cacheImg = (function()
{
	var canvas = document.createElement("canvas");
	canvas.width = canvas.height = 20;
	var context = canvas.getContext("2d");
	context.fillStyle = "rgb(0,0,0)";
	context.beginPath();
	context.arc(canvas.width/2, canvas.width/2, canvas.width/2, 0, Math.PI*2);
	context.fill();
	return canvas;
})();

Particle.prototype.draw = function()
{
	context.drawImage(this.cacheImg, this.loc.x, this.loc.y, this.r, this.r);
}

Particle.prototype.render = function()
{
	this.draw();
	this.loc.plus(this.v);
	this.v.plus(this.a);
	this.v.scale(.95);
	this.time ++;
	if(this.time === this.dieTime)
	{
		this.isDie = true;
	}
	if(player.x > 339 || player.x < 151)
	{
		this.loc.x -= player.dir * player.speed/3;
	}
}

var tool = {
	random:function(x, y, isInt)
	{
		return Math.random() * (y - x) + x;
	}
}