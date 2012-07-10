function Bitmap(x, y, img, width, height)
{
	this.x = x;
	this.y = y;
	this.img = document.getElementById(img);
	this.width = width || this.img.width;
	this.height = height || this.img.height;
}

Bitmap.prototype.draw = function()
{
	context.drawImage(this.img, this.x, this.y, this.width, this.height);
};

Bitmap.prototype.getData = function()
{
	var canvas = document.createElement("canvas");
	canvas.width = this.width;
	canvas.height = this.height;
	var context = canvas.getContext("2d");
	context.drawImage(this.img, 0, 0, this.width, this.height)
	this.data = context.getImageData(0, 0, this.width, this.height).data;
}

Bitmap.prototype.getRGBA = function(x, y)
{
	if(!this.data)
	{
		this.getData();
	}
	var num = (y * this.width + x) * 4;
	return {r:this.data[num],g:this.data[num + 1],b:this.data[num + 2],a:this.data[num + 3]}
}

var hitGround = new Bitmap(0, 0, "hitGround", 2500, 400);

function Ground(x, y, img, width, height)
{
	this.x = x;
	this.y = y;
	this.img = document.getElementById(img);
	this.width = width||this.img.width;
	this.height = height||this.img.height;
}

Ground.prototype.render = function()
{
	this.draw();
}

Ground.prototype.draw = function()
{
	if(this.x >= 0 && this.x < this.img.width - 550)
	{
		context.drawImage(this.img, this.x, this.y, 550, this.img.height, 0, 0, 550, this.height);
	}
	else
	{
		var temp = this.x - (this.img.width - 550);
		context.drawImage(this.img, this.x, this.y, 550 - temp, this.img.height, 0, 0, 550 - temp, this.height);
		context.drawImage(this.img, 0, this.y, temp, this.img.height, 550 - temp, 0, temp, this.height);
	}
}

Ground.prototype.move = function(v)
{
	this.x += v;
	if(this.x > this.img.width ) this.x = 0;
	else if(this.x < 0) this.x = this.img.width;
}

var ground = new Ground(0, 0, "hitGround", 550, 400);
var groundBack = new Ground(0, 0, "groundBack", 550, 400);











