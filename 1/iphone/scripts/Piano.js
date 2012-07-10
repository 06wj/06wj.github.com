function Piano(x)
{
	this.mc = new MovieClip(x, 225, 'piano', 140, 130, 12, 1);
	this.mc.initCache();
	this.time = 0;
	this.die = false;
};

Piano.prototype.draw = function()
{
	this.time ++;
	if(this.time < 36)
	{
		var r = this.time * .9;
		context.save();
		context.scale(1,.25);
		context.beginPath();
		context.fillStyle = 'rgba(33,33,33,.3)';
		context.arc(this.mc.x,1050 + this.time*.5, r, 0, Math.PI*2);
		context.fill();
		context.restore();
	}
	else if(this.mc.frame != this.mc.totalFrame - 1)
	{
		if(this.mc.frame == 0)
		{
			var x = this.mc.x;
			context.save();
			context.fillStyle = 'rgba(255,255,255,.5)';
			context.fillRect(x - 20, 0, 40, 250);
			context.restore();
		}
		else if(this.mc.frame < 2)
		{
			var x = this.mc.x;
			context.save();
			context.fillStyle = 'rgba(255,255,255,.5)';
			context.fillRect(x - 7, 0, 14, 250);
			context.restore();
		}
		
		this.mc.draw();
	}
	else 
	{
		this.die = true;
	}
}
