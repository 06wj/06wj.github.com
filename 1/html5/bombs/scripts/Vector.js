function Vector(x, y)
{
	this.x = x||0;
	this.y = y||0;
}

Vector.prototype.getClone = function()
{
	return new Vector(this.x, this.y);	
};

Vector.prototype.plus = function(v)
{
	this.x += v.x;
	this.y += v.y;
};

Vector.prototype.plusNew = function(v)
{
	return new Vector(this.x + v.x, this.y + v.y);
}

Vector.prototype.scale = function(s)
{
	this.x *= s;	
	this.y *= s;	
};

Vector.prototype.scaleNew = function(s)
{
	return new Vector(this.x * s, this.y * s);
};

Vector.prototype.getAngle = function()
{
	return Math.atan2(this.y, this.x);	
};

Vector.prototype.setAngle = function(ang)
{
	var l = this.getLength();
	this.x = Math.cos(ang) * l;
	this.y = Math.sin(ang) * l;
};

Vector.prototype.getLength = function()
{
	return Math.sqrt(this.x*this.x + this.y*this.y);	
};

Vector.prototype.setLength = function(len)
{
	var r = this.getLength();
	if (r) this.scale (len / r);
	else this.x = len;
};