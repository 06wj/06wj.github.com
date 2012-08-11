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
};


var playerWidth = 60;

function Player(x, y, width, next, dir)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.frames ={
		jump:new MovieClip(0, 0, "billdJump", this.width, this.width, 12, 1),
		run:new MovieClip(0, 0, "billdRun", this.width, this.width, 6, 2),
		stand:new MovieClip(0, 0, "billdStand", this.width, this.width, 6, 2)		
	};
	this.frame = "stand";
	this.speed = .5;
	this.speedY = 0;
	this.a = 1;
	this.isJump = false;
	this.next = next;
	this.dir = dir||1;
	this.hitWidth = this.width/2 - this.width/12;
	this.groundMove = false;
};


Player.prototype = 
{
	draw:function()
	{
		context.save();
		context.translate(this.x,this.y);
		if(this.dir == -1)
		{
			context.scale(this.dir,1);
			context.translate(-this.width,0);
		}
		this.frames[this.frame].draw();
		context.restore();
		
		if(this.next)
		{
			this.next.render();
		};
	},
	render:function()
	{
		this.draw();
		this.y += this.speedY;
		this.x += this.dir * this.speed;
		
		if(this.x > 340) 
		{
			this.groundMove = true;
			this.x = 340;
			ground.move(this.dir * this.speed);	
			groundBack.move(this.dir * this.speed/3);	
		}
		else if(this.x < 150) 
		{
			this.groundMove = true;
			this.x =150;
			ground.move(this.dir * this.speed);	
			groundBack.move(this.dir * this.speed/3);
		}
		
		else
		{
			this.groundMove = false;
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
		
		if(this.next)
		{
			this.next.moveLeft();
		}
	},
	moveRight:function()
	{
		this.dir = 1;
		this.speed = 8;
		this.frame = "run";
		
		if(this.next)
		{
			this.next.moveRight();
		}
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
		
		if(this.next)
		{
			this.next.stand();
		}
	},
	hitGround:function()
	{
		var x =  parseInt(ground.x + this.x),y = parseInt(this.y);
		var color1 = hitGround.getRGBA(x + 25, y + this.width);
		var color2 = hitGround.getRGBA(x + this.width - 25, y + this.width);
		return (color1.a > 10) || (color2.a > 10);
	},
	addParticles:function(n)
	{
		var i,v,particle;
		for(i = 0;i < n;i++)
		{
			particle = new Particle(this.x + this.width/2, this.y + this.width + 10, tool.random(0, 4));
			particle.v = new Vector(tool.random(-10, 10) - (this.speed * this.dir/2), tool.random(-7, -1) - this.speedY/2);
			particles.push(particle);
		}
	}
};

function Little(x, y, width, next, dir)
{
	Player.apply(this, arguments);
}

Little.prototype = new Player();

Little.prototype.render = function()
{
	this.draw();
	this.y += this.speedY;
	if(!player.groundMove)
	{
		this.x += this.dir * this.speed;
	}
	if(this.hitGround())
	{
		if(this.isJump || this.speedY > 16)
		{
			this.isJump = false;
			//this.addParticles(25);
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
};

var player = new Player(245, 0, playerWidth);//, new Little(195, 0, 40,new Little(155, 0, 30, new Little(125, 0, 20, new Little(105, 0, 10)))));






