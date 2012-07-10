var player = 
{
	loc:new Vector(250, 250),
	shootTime:6,
	time:0,
	v:new Vector(0, 0),
	maxV:6,
	angleV:.1,
	angle:-Math.PI/2,
	width:30,
	hitWidth:18,
	canShoot:true,
	score:0,
	shootAngle:0,
	a:.4,
	nowV:0,
	F:new Vector(0, 0),
	fa:1,
	nowF:0,
	
	draw:function()
	{
		var img = document.getElementById("playerImg");
		g.save();
		g.translate(this.loc.x, this.loc.y);
		g.rotate(this.angle);
		g.drawImage(img, - this.width/2, - this.width/2, this.width, this.width) ;
		g.restore();
	},
	
	addFire:function()
	{
		var temp = new Vector(0, 1);
		temp.setAngle(this.angle);
		temp.setLength(this.width/2);
		
		if(this.v.getLength())
		{
			var fire = new Fire(this.loc.x - temp.x, this.loc.y - temp.y, this.v);
			bombs.push(fire);
		}
	},
	
	addBullet:function()
	{
		this.shootAngle = 0;
		if(key[K_UP]) this.shootAngle = this.shootAngle | UP ;
		if(key[K_DOWN]) this.shootAngle = this.shootAngle | DOWN;
		if(key[K_LEFT]) this.shootAngle = this.shootAngle | LEFT;
		if(key[K_RIGHT]) this.shootAngle = this.shootAngle | RIGHT;
		
		var angle;
		/*
		switch(this.shootAngle)//       
		{
			case UP:angle = - Math.PI/2;break;
			case UP|LEFT:angle = Math.PI/4*5;break;
			case LEFT:angle = Math.PI;break;
			case DOWN|LEFT:angle = -Math.PI/4*5;break;
			case DOWN:angle = Math.PI/2;break;
			case DOWN|RIGHT:angle = Math.PI/4;break;
			case RIGHT:angle = 0;break;
			case UP|RIGHT:angle =- Math.PI/4;break;
			case 0:angle = this.angle;break;
			default:return;
		}
		*/
		angle = this.angle
		
		var temp = this.v.getClone();
		temp.setLength(this.width/2);
		
		var bullet = new Bullet(this.loc.x, this.loc.y, angle);
		bullets.push(bullet);
	},
		
	keymove:function()
	{
		var i;
		
		if(key[K_W] || key[K_UP]) 
		{
			this.nowV += this.a;
			if(this.nowV > this.maxV ) this.nowV = this.maxV;
		}
		else if(key[K_S] || key[K_DOWN]) 
		{
			
		}
		else
		{
			this.nowV -= this.a;
			if(this.nowV < 0 ) this.nowV = 0;
		}
		if(key[K_A] || key[K_LEFT]) 
		{
			this.angle -= this.angleV;
		}
		if(key[K_D] || key[K_RIGHT]) 
		{
			this.angle += this.angleV;
		}
		this.v.setAngle(this.angle);
		
		
	},
	
	move:function()
	{
		this.loc.plus(this.v);
		this.loc.plus(this.F);
		this.v.setLength(this.nowV);

		ground.x -= this.v.x/3;
		ground.y -= this.v.y/3;
		
		for(i = 0; i < enemys.length; i ++)
		{
			enemys[i].loc.x -= this.v.x/1;
			enemys[i].loc.y -= this.v.y/1;
		}
		
		this.nowF -= this.fa;
		if(this.nowF < 0) this.nowF = 0;
		this.F.setLength(this.nowF);
	},
	
	updata:function()
	{
		this.keymove();
		this.hitGround();
		this.move();
		
		if(this.canShoot === true) 
		{
			if(this.time == 0)
			{
				this.time = this.shootTime;
				this.addBullet();
			}
			this.time --;
		}

		this.addFire();
		//this.checkHit();
	},
	
	checkHit:function()
	{
		var i,l;
		for(i = 0,l = enemys.length; i < l; i ++)
		{
			if(tool.hitTestObject(this, enemys[i]))
			{
				
				alert("You Lose!");
				player.score = 0;
				
				enemys = [];
				key = {};
				objs[0] = enemys;
				
			}
			
		}
	},
	hitGround:function()
	{
		if(this.loc.x - this.width/2 < 54 || this.loc.x + this.width/2 > 446 || this.loc.y - this.width/2 < 54 || this.loc.y + this.width/2 > 446) 
		{
			this.F = this.v.negateNew();
			this.F.setLength(15);
			this.nowF = 15;
			return true;
		}
		return false;
	}
	
}


document.onmousemove = function(e)
{
	var x = e.x - 82;
	var y = e.y - 102;
	
	if(x < 0) x = 0;
	if(y < 0) y = 0;
	
	if(x > 436) x = 436;
	if(y > 436) y = 436;
	
	return;
}




function Bullet(x, y, angle)
{
	this.loc = new Vector(x, y);
	this.angle = angle + Math.PI/2;
	this.v = new Vector(0, 13);
	this.v.setAngle(angle);
	this.width = 16;
	this.hitWidth = 16;
	this.isDie = false;
}

Bullet.prototype.updata = function()
{
	this.loc.plus(this.v);
	if(this.loc.y < -32 || this.loc.y > 532 || this.loc.x < -32 || this.loc.x > 532) this.isDie = true;	
}

Bullet.prototype.draw = function()
{
	var img = document.getElementById("bulletImg");
	g.save();
	g.translate(this.loc.x, this.loc.y);
	g.rotate(this.angle);
	g.drawImage(img, 0, 0, this.width, this.width, - this.width/2, - this.width/2, this.width, this.width) ;
	g.restore();	
}



