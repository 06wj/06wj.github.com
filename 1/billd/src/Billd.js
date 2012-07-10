(function(){
	var ns = Q.use("billd");
	var run = 1, walk = 2, jump = 3;
	var Billd = ns.Billd = function(props)
	{
		Q.MovieClip.call(this, props);
		this.id = Q.UIDUtil.createUID("Billd");

		this.hitX = this.x;
		this.speedX = 5;
		this.g = .5;
		this.speedY = 0;
		this.isJump = false;
		
		this.initFrames();
	}
	Quark.inherit(Billd, Q.MovieClip);

	Billd.prototype.initFrames = function()
	{
		var frames = [], i, j;
		
		for(i = 0;i < 2;i++)
		{
			for(j = 0;j < 12;j++)
			{
				//if(i == 1) j++;
				frames.push({rect:[j * 120, i * 120, 120, 120]});
			}
		}
		frames[0].label = frames[5].jump = "run";
		frames[6].label = frames[11].jump = "walk";
		frames[12].label = frames[23].jump = "jump";

		this.addFrame(frames);	
	};

	Billd.prototype.hitGround = function()
	{
		this.hitX = parseInt((this.x + Math.abs(ns.hitGround.x)%3406)%3406);
		if(this.y > ns.hitY[this.hitX])
		{
			return true;
		}
		return false;	
	};

	Billd.prototype.move = function(dir)
	{
		this.speedX = 7;
		if(!this.isJump && this.label != run)
		{
			this.label = run;
			this.gotoAndPlay("run");
		}

		this.scaleX = dir;
	};

	Billd.prototype.walk = function()
	{
		this.speedX = .5;
		if(!this.isJump && this.label != walk)
		{
			this.label = walk;
			this.gotoAndPlay("walk");
		}
	};

	Billd.prototype.jump = function()
	{
		if(this.label != jump)
		{
			this.speedY = -14;
			this.isJump = true;
			this.label = jump;
			this.gotoAndPlay("jump");
		}

		this.y --;
	};

	Billd.prototype.update = function()
	{
		this.x += this.scaleX * this.speedX;
		this.y += this.speedY;
		
		if(this.x > ns.game.width - 350) 
		{
			this.x = ns.game.width - 350;
			this.moveGround(this.speedX);
		}
		else if(this.x < 350) 
		{
			this.x = 350;
			this.moveGround(- this.speedX);
		}

		if(this.hitGround())
		{
			if(this.isJump || this.speedY > 16)
			{
				this.isJump = false;
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
			this.speedY += this.g;
		}
	};

	Billd.prototype.moveGround = function(speed)
	{
		ns.bck.x -= speed * 1.5;
		ns.hitGround.x -= speed;
		
		if(speed < 0)
		{
			if(ns.bck.x >= 0) 
			{
				ns.bck.x = -2891;
			}

			
			if(ns.hitGround.x >= 0) 
			{
				ns.hitGround.x = -3406;
			}	
		}
		else if(speed > 0)
		{
			if(ns.bck.x <= -2891) 
			{
				ns.bck.x = 0;
			}
			
			if(ns.hitGround.x <= -3406) 
			{
				ns.hitGround.x = 0;
			}	
		}
			
	};
})();