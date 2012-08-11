function Bomb(x, y, type)
{
	this.time = 0
	this.frame = 0;
	this.type = type;
	this.loc = new Vector(x, y);
	
	this.v = new Vector(0, tool.random(0, 3));
	this.v.setAngle(tool.random(0, 6.28));
	
	this.a = this.v.getClone(1);
	this.a.setLength(tool.random(.1, 1));
	
	this.ang = this.v.getAngle() + Math.PI/2;
	
	this.isDie = false;
}

Bomb.prototype.updata = function()
{
	this.time ++;
	this.loc.plus(this.v);
	this.v.plus(this.a);
	
	
	this.frame = parseInt(this.time / 4);	
	
	if(this.loc.x > 500 || this.loc.y > 500 || this.loc.x < 0 || this.frame > 10)  
	{
		this.isDie = true;	
	}
}

Bomb.prototype.draw = function()
{
	var img = document.getElementById("fireImg");
	
	g.save();
	g.translate(this.loc.x + 10, this.loc.y + 10);
	g.rotate(this.ang);
	g.drawImage(img, this.frame * 20, this.type * 20, 20, 20, -10, -10, 20 + this.frame * 2, 20 + this.frame * 2);
	g.restore();
}


