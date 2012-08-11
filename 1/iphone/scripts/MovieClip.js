function MovieClip(x, y, img, width, height, totalFrame, fps)
{
	Sprite.call(this, x, y, img, width, height)
	this.time = 0;
	this.frame = 0;
	this.width = width;
	this.height = height;
	this.totalFrame = totalFrame;
	this.fps = fps || 1;
	this.cache = [];
}

MovieClip.prototype = new Sprite();

MovieClip.prototype.draw = function()
{
	this.time ++;
	if(this.time % this.fps == 0)
	{
		this.frame ++;
		if(this.frame == this.totalFrame) this.frame = 0;
	}

	var frame = this.frame;
	
   context.save();
   context.translate(this.x , this.y);
   context.globalAlpha = this.alpha;
   context.rotate(this.angle);
   context.scale(this.scaleX, this.scaleY);
   context.drawImage(this.cache[this.frame], -this.halfWidth, -this.halfHeight);
   context.restore();
}

MovieClip.prototype.initCache = function()
{
	for(var i = 0; i < this.totalFrame; i ++)
	{
		this.cache[i] = document.createElement('canvas');
		this.cache[i].width = this.width;
		this.cache[i].height = this.height;
		this.cache[i].getContext('2d').drawImage(assets[this.img], i * this.width, 0, this.width, this.height, 0, 0, this.width, this.height);
	}
}








