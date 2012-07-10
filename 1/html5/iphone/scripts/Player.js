function MovieClip(x, y, img, width, height, totalFrame, fps)
{
	this.x = x;
	this.y = y;
	this.img = document.getElementById(img);
	this.time = 0;
	this.frame = 0;
	this.width = width;
	this.height = height;
	this.totalFrame = totalFrame;
	this.fps = fps || 1;
}

MovieClip.prototype.draw = function()
{
	this.time ++;
	if(this.time % this.fps == 0)
	{
		this.frame ++;
		if(this.frame == this.totalFrame) this.frame = 0;
	}

	var frame = this.frame;
	context.drawImage(this.img, this.frame * 120, 0, 120, 120, this.x, this.y + 3, this.width, this.height);
}


var playerWidth = 60;
var player = 
{
	x:245,
	y:0,
	dir:1,
	frame:"stand",
	speed:.5,
	speedY:0,
	a:1,
	isJump:false,
	width:playerWidth,
	draw:function()
	{
		context.save();
		context.translate(this.x,this.y);
		if(this.dir == -1)
		{
			context.scale(this.dir,1);
			context.translate(-60,0);
		}
		this.frames[this.frame].draw();
		context.restore();
	},
	frames:{
			jump:new MovieClip(0, 0, "billdJump", playerWidth, playerWidth, 12, 1),
			run:new MovieClip(0, 0, "billdRun", playerWidth, playerWidth, 6, 2),
			stand:new MovieClip(0, 0, "billdStand", playerWidth, playerWidth, 6, 2)
		},
	render:function()
	{
		this.draw();
		this.y += this.speedY;
		this.x += this.dir * this.speed;
		
		if(this.x > 340) 
		{
			this.x = 340;
			ground.move(this.dir * this.speed);	
			//groundBack.move(this.dir * this.speed/3);	
		}
		else if(this.x < 150) 
		{
			this.x =150;
			ground.move(this.dir * this.speed);	
			//groundBack.move(this.dir * this.speed/3);
		}
		
		if(this.hitGround())
		{
			if(this.isJump || this.speedY > 16)
			{
				this.isJump = false;
				this.addParticles(25);
			}
			this.speedY = 0;
			while(this.hitGround())
			{
				this.y --;
			}
			this.y ++;
		}
		else
		{
			this.speedY += this.a;
		}
	},
	moveLeft:function()
	{
		this.dir = -1;
		this.speed = 8;
		this.frame = "run";
	},
	moveRight:function()
	{
		this.dir = 1;
		this.speed = 8;
		this.frame = "run";
	},
	jump:function()
	{
		this.frame = "jump";
		this.speedY = -16;
		this.isJump = true;
	},
	stand:function()
	{
		this.speed = .5;
		this.frame = "stand";
	},
	hitGround:function()
	{
		var x =  parseInt(ground.x + this.x),y = parseInt(this.y);
		var color1 = hitGround.getRGBA(x + 25, y + this.width);
		var color2 = hitGround.getRGBA(x + this.width - 25, y + this.width);
		return (color1.r < 10) || (color2.r < 10);
	},
	addParticles:function(n)
	{
		var i,v,particle;
		for(i = 0;i < n;i++)
		{
			particle = new Particle(this.x + playerWidth/2, this.y + playerWidth + 10, tool.random(0, 4));
			particle.v = new Vector(tool.random(-10, 10) - (this.speed * this.dir/2), tool.random(-7, -1) - this.speedY/2);
			particles.push(particle);
		}
	}
};













