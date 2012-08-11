var player = 
{
	x:250,
	y:400,
	time:110,
	score:0,
	width:40,
	loc:new Vector(250, 400),
	draw:function()
	{
		var img = document.getElementById("playerImg");
		g.drawImage(img, this.x, this.y , 64, 64) ;
	},
	
	addFire:function()
	{
		var fire = new Fire(this.x + 22, this.y + 50);
		bombs.push(fire);
	},
	
	addBullet:function()
	{
		var bullet = new Bullet(this.x + 16, this.y - 10);
		bullets.push(bullet);
	},
		
	keymove:function()
	{
		var v = 11;
		if(key[K_W] || key[K_UP]) 
		{
			this.y -= v;
			if(this.y < 0) {this.y = 0;}
		}
		
		if(key[K_S] || key[K_DOWN]) 
		{
			this.y += v;
			if(this.y > 436) {this.y = 436;}
		}
		
		if(key[K_A] || key[K_LEFT]) 
		{
			this.x -= v;
			if(this.x < 0) {this.x = 0;}
		}
		
		if(key[K_D] || key[K_RIGHT]) 
		{
			this.x += v;
			if(this.x > 436) {this.x = 436;}
		}
		
		
	},
	
	update:function()
	{
		this.time ++;
		this.keymove();
		if(this.time > 4) 
		{
			this.time = 0;
			this.addBullet();
		}
		this.addFire();
		
		for(var i = 0; i < enemys.length;i ++)
		{
			var ex = enemys[i].loc.x + enemys[i].width/2; 
			var ey = enemys[i].loc.y + enemys[i].width/2;
			var tx = this.x + 32;
			var ty = this.y + 32;
			var xx = tx - ex;
			var yy = ty - ey;
			
			if((xx*xx + yy*yy) < ((enemys[i].width/2.5 + 16)*(enemys[i].width/2.5 + 16)))
			{
				alert("You Lose!!!");
				player.score = 0;
				enemyTime = 10;
				enemys = [];
				key = [];
				objs[0] = enemys;
			}
		}
	}
	
}

function Bullet(x, y)
{
	this.loc = new Vector(x, y);
	this.speed = 13;
	this.width = 32;
	this.isDie = false;
}

Bullet.prototype.update = function()
{
	this.loc.y -= this.speed;
	if(this.loc.y < -32) this.isDie = true;	
};

Bullet.prototype.draw = function()
{
	var img = document.getElementById("bulletImg");
	g.drawImage(img, 0, 0, 32, 32, this.loc.x, this.loc.y, 32, 32) ;
};






