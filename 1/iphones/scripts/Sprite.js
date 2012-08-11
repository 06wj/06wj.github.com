function Sprite(x, y, img, width, height)
{
    this.x = x;
    this.y = y;
	this.img = img;
	this.width = width;
    this.height = height;
    this.halfWidth = this.width/2;
    this.halfHeight = this.height/2;
    this.angle = 0;
    this.scaleX = 1;
    this.scaleY = 1;
}

Sprite.prototype.draw = function()
{
   context.save();
   context.translate(this.x , this.y);
   context.rotate(this.angle);
   context.scale(this.scaleX, this.scaleY);
   context.drawImage(assets[this.img], -this.halfWidth, -this.halfHeight);
   context.restore();
}







