var player = 
{
	mc:new MovieClip(200, 225, 'player', 49, 80, 9, 1),
	angle:0,
	frame:0,
	div:document.getElementById('player'),
	die:function()
	{
		this.div.style.display = "none";
		this.angle += .3;
		if(this.angle < Math.PI*2){this.mc.y -=3;}
		else{this.mc.y +=3;}
		if(this.mc.y > 225)
		{
			this.mc.y = 225;
			this.mc.x = 200;
			this.angle = 0;
			btnContext.clearRect(0, 0, 460, 320);
			gameState = 'gameOver';
			hitPiano.hide();
			return;
		}
		btnCanvas.width = 460;
		btnCanvas.height = 320;
		btnCanvas.style.left = 0;
		btnCanvas.style.top = 0;
		btnContext.clearRect(this.mc.x,this.mc.y,100,100);
		btnContext.save();
		btnContext.translate(this.mc.x, this.mc.y);
		btnContext.rotate(this.angle);
		btnContext.drawImage(assets['player'], 0, 0, 49, 80, -24.5, -40, 49, 80);
		btnContext.restore();
	},
	render:function()
	{
		this.frame ++;
		this.frame = this.frame == 9?0:this.frame;
		this.div.style.backgroundPosition = this.frame * 49 + "px " +"0px"; 
	}
};

var gameStart = 
{
	num:new MovieClip(230, 160, 'num', 190, 190, 20, 1),
	circle: new Sprite(230, 160, 'bckCircle', 608, 561),
	star: new Sprite(230, 160, 'bckStar', 263, 265),
	mouse: new Sprite(230, 160, 'bckMouse', 260, 200),
	time:0,
	draw:function()
	{
		this.time ++;
		this.circle.draw();
		this.circle.angle-=.1;
		if(this.time < 41)
		{
			if(this.time < 10)
			{
				this.mouse.scaleX += .1;
				this.mouse.scaleY += .1;
			}
			else if(this.time < 22)
			{
				this.star.scaleX += .1;
				this.star.scaleY += .1;
				this.star.angle += .1;
				this.star.draw();
			}
			else if(this.time < 32)
			{
				this.star.scaleX -= .1;
				this.star.scaleY -= .1;
				this.star.angle -= .1;
				if(this.mouse.scaleX > .1)
				{
					this.mouse.scaleX -= .1;
					this.mouse.scaleY -= .1;
				}
				this.star.draw();
			}
			
			this.mouse.draw();
		}
		if(this.time > 38)
		{
			if(this.num.frame === this.num.totalFrame - 1)
			{
				gameState = 'gamePlay';
				player.div.style.display = "block";
				context.clearRect(0, 0, 460, 320);
				player.div.style["webkitTransform"] = "translate(200px, 225px)";
				return;
			}
			this.num.draw();
		}
	},
	init:function()
	{
		this.mouse.scaleX = 0;
		this.mouse.scaleY = 0;
		this.star.scaleX = 0;
		this.star.scaleY = 0;
	}
};

var gameOver = 
{
	circle:new Sprite(230, 160, 'bckCircle', 608, 561),
	gameOver:new Sprite(230, 160, 'gameOver', 230, 160),
	bckOver:new Sprite(230, 160, 'bckOver', 460, 320),
	time:0,
	draw:function()
	{
		this.time ++;
		
		if(this.time < 40)
		{
			this.circle.draw();
			this.gameOver.draw();
			this.circle.angle-=.1;
		}
		else if(this.time == 40)
		{
			this.bckOver.draw();
			context.font ='13px/1.5 tahoma, Srial, helvetica, sans-serif' ;
			context.fillStyle = '#fff'
			context.fillText(parseInt(score/10),236,125);
			context.fillText(localStorage.getItem('score'),263,152);
			
			btnAgain.draw(2);
			
			btnCanvas.onmouseover = function(){btnAgain.draw(0);};
			btnCanvas.onmouseout = function(){btnAgain.draw(2);};
			btnCanvas.ontouchstart = function(){btnAgain.draw(1);};
			btnCanvas.onmousedown = function(){btnAgain.draw(1);};
			btnCanvas.ontouchend = function(){btnAgain.draw(2);btnContext.clearRect(0, 0, btnCanvas.width, btnCanvas.height);gameAgain()};
			btnCanvas.onmouseup = function(){btnAgain.draw(2);btnContext.clearRect(0, 0, btnCanvas.width, btnCanvas.height);gameAgain()};
		}
	}
};


var start = {
	sprite:new Sprite(230,160,'bckStart',460,320)
}













