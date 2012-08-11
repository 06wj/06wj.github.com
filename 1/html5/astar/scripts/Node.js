function Node(x, y)
{
	this.x = x;
	this.y = y;
	
	this.f = 0;
	this.g = 0;
	this.h = 0;
	
	this.walkable = true;
	this.type = 0;	
	this.parent = null; 
	this.costMultiplier = 1.0; 
}