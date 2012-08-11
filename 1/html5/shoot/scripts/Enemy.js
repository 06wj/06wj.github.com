function Enemy(x, y)
{
	this.loc = new Vector(x, y);
	this.v = new Vector(tool.random(-5 ,5), tool.random(3, 7));
	this.width = tool.random(32, 60);
	this.angle = tool.random(0, 3.14);
	this.angleV = tool.random(-.5, .5);
	this.time = 0;
	this.isDie = false;
	this.img = "enemy1Img";
}

Enemy.prototype.draw = function()
{
	var img = document.getElementById(this.img);
	
	g.save();
	g.translate(this.loc.x + this.width/2, this.loc.y + this.width/2);
	g.rotate(this.angle);
	g.drawImage(img, - this.width/2, - this.width/2, this.width, this.width) ;
	g.restore();
};


Enemy.prototype.update = function()
{
	this.loc.plus(this.v);
	if(this.loc.y > 600 || this.loc.y < -100 || this.loc.x < -100 || this.loc.x > 600) 
	{
		this.isDie = true;
		return;
	}
	
	this.angle += this.angleV;
	this.time ++;
	this.checkHit();
	
	if(this.isDie)
	{
		this.addBombs();
	}
};


Enemy.prototype.checkHit = function()
{
	var tempBullets = bullets;
	for(var i = 0; i < tempBullets.length; i ++)
	{
		if(tool.hitTestObject(this, tempBullets[i]))
		{
			this.isDie = true;
			tempBullets[i].isDie = true;
			player.score += 5;
		}
	}
};

Enemy.prototype.addBombs = function()
{
	var bomb;
	var type = tool.random(1, 7, true);
	for(var i = 0 ; i < 40; i ++)
	{
		bomb = new Bomb(this.loc.x + this.width/2, this.loc.y + this.width/2, type);
		bombs.push(bomb);
	}
};


function Enemy2(x, y)
{
	Enemy.call(this, x, y);
	this.img = "enemy2Img";
	this.width = 48;
	this.angle = 0;
	this.angleV = 0;
}

Enemy2.prototype = new Enemy();


Enemy2.prototype.checkHit = function()
{
	var tempBullets = bullets;
	var loc = new Vector(player.x + 32, player.y + 32);
	var ang = (loc.minusNew(this.loc)).getAngle();
	
	this.v.setAngle(ang + tool.random(-.1, .1));
	
	this.angle = ang - Math.PI/2;
	
	this.loc.plus(this.v);
	
	for(var i = 0; i < tempBullets.length; i ++)
	{
		if(tool.hitTestObject(this, tempBullets[i]))
		{
			this.isDie = true;
			tempBullets[i].isDie = true;
			player.score += 5;
		}
	}
};


function Enemy3(x, y)
{
	Enemy.call(this, x, y);
	this.img = "enemy3Img";
	this.width = 40;
	this.v = new Vector(tool.random(-5 ,5), tool.random(7, 12));
}

Enemy3.prototype = new Enemy2();



