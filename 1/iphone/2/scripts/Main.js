var gameState = 'start';
function updateAll()
{
	switch(gameState)
	{
		case 'gamePlay':gamePlay();
						break;
		default:break;
	}
	
}

function drawAll()
{
	switch(gameState)
	{
		case 'start' :start.sprite.draw();
						break;
		case 'gamePlay':gamePlayDraw();
						break;
	
		case 'gameStart':gameStart.draw();
						break;
		case 'gameOver':gameOver.draw();
						break;
		case 'playerDie':player.die();
						break;
		default:break;
	}	
	
}

function addPianos()
{
	if(score%pianoSpeed == 0)
	{
		var piano = new Piano(Math.random()*400 + 30);
		pianos.push(piano);
	}
	
	pianoSpeed = parseInt((100 - score/35));
	if(pianoSpeed < pianoMaxSpeed) pianoSpeed = pianoMaxSpeed;
}

function gamePlay()
{
	score ++;
	addPianos();
	
	if(key[37]) 
	{
		
		player.mc.x -= speed;
		if(player.mc.x < 25) player.mc.x = 25;
		player.div.style["webkitTransform"] = "translate(" + player.mc.x + "px," + player.mc.y + "px)";
		
	}
	else if(key[39]) 
	{
		player.mc.scaleX = -1;
		player.mc.x += speed;
		if(player.mc.x > 435) player.mc.x = 435;
		player.div.style["webkitTransform"] = "translate(" + player.mc.x + "px," + player.mc.y + "px)";
	}
	context.fillText(parseInt(score/10), 420, 18)
}

function gamePlayDraw()
{
	context.drawImage(assets.bck, 0, 0);
	for(i = 0; i < pianos.length;i ++)
	{
		if(pianos[i].die)
		{
			pianos.splice(i, 1);
			i --;
			continue;
		}
		
		pianos[i].draw();
		if(pianos[i].mc.frame < 5 && pianos[i].mc.frame)
		{
			if(Math.abs(pianos[i].mc.x - player.mc.x) < 43)
			{
				if(localStorage.getItem('score') <= parseInt(score/10))
				{
					localStorage.setItem('score',parseInt(score/10));
				}
				gameState = 'playerDie';
				return;
			}
		}
	}
	player.draw();
}