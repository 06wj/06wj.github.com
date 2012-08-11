function Enemy(x, y)
{
	this.loc = new Vector(x, y);
	this.v = new Vector(tool.random(-5 ,5), tool.random(-5, 5));
	this.width = 36;
	this.hitWidth = 22;
	this.angle = tool.random(0, 3.14);
	this.angleV = .3;
	this.time = 0;
	this.isDie = false;
	this.img = "enemyImg";
	this.score = 5;
}

Enemy.prototype.draw = function()
{
	var img = document.getElementById(this.img);
	
	g.save();
	g.translate(this.loc.x, this.loc.y);
	g.rotate(this.angle);
	g.drawImage(img, - this.width/2, - this.width/2, this.width, this.width) ;
	g.restore();
}


Enemy.prototype.updata = function()
{
	
	var ang = (player.loc.minusNew(this.loc)).getAngle();
	
	this.v.setAngle(ang + tool.random(-.1, .1));
	
	this.loc.plus(this.v);
	
	tool.hitTestGround(this);
	
	this.angle += this.angleV;
	this.time ++;
	this.checkHit();
	
	if(this.isDie)
	{
		this.addBombs();
	}
}


Enemy.prototype.checkHit = function()
{
	var tempBullets = bullets;
	for(var i = 0; i < tempBullets.length; i ++)
	{
		if(tool.hitTestObject(this, tempBullets[i]))
		{
			player.score += this.score;
			this.isDie = true;
			tempBullets[i].isDie = true;
		}
	}
}

Enemy.prototype.addBombs = function()
{
	var bomb;
	var type = tool.random(1, 7, true);
	for(var i = 0 ; i < 40; i ++)
	{
		bomb = new Bomb(this.loc.x, this.loc.y, type);
		bombs.push(bomb);
	}
}


function Enemy2(x, y)
{
	Enemy.call(this, x, y);
	this.img = "enemy2Img";
	this.width = 48;
	//this.angle = 0;
	//this.angleV = 0;
}

Enemy2.prototype = new Enemy();

function Enemy3(x, y)
{
	Enemy2.call(this, x, y);
	this.img = "enemy3Img";
}

Enemy3.prototype = new Enemy2();








