var gameState = 'start';
var scoreDiv = document.getElementById("score");

var ax,ay;
window.ondevicemotion = function(event){
  ax = event.accelerationIncludingGravity.x;
  ay = event.accelerationIncludingGravity.y;
 }
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
	var i;
	if(score%pianoSpeed == 0)
	{
		for(i = 0;i<10;i++)
		{
			var piano = pianos[i];
			if(piano.die)
			{
				piano.init();
				break;
			}
		}
	}

		pianoSpeed = parseInt((pianoSpeedAll - score/35));
		if(pianoSpeed < pianoMaxSpeed) pianoSpeed = pianoMaxSpeed;
	
}

function gamePlay()
{
	score ++;
	addPianos();
	
	if(key[37] || ay >-1) 
	{
		player.mc.scaleX = 1;
		player.mc.x -= speed;
		if(player.mc.x < 25) player.mc.x = 25;
		player.div.style["webkitTransform"] = "translate(" + player.mc.x + "px," + player.mc.y + "px) scaleX(1)";
	}
	else if(key[39] || ay < 1) 
	{
		player.mc.scaleX = -1;
		player.mc.x += speed;
		if(player.mc.x > 435) player.mc.x = 435;
		player.div.style["webkitTransform"] = "translate(" + player.mc.x + "px," + player.mc.y + "px) scaleX(-1)";
	}
	scoreDiv.innerHTML = parseInt(score/10);
}

function gamePlayDraw()
{
	player.render();
	for(i = 0; i < 10;i ++)
	{
		var piano = pianos[i];
		if(!piano.die)
		{
			piano.render();
			if(piano.frame >= 70 && piano.frame <= 76)
			{
				if(Math.abs(piano.x + 30 - player.mc.x) < 43)
				{
					if(localStorage.getItem('score') <= parseInt(score/10))
					{
						localStorage.setItem('score',parseInt(score/10));
					}
					gameState = 'playerDie';
					for(i = 0;i<50;i++)
					{
						hitPiano = piano;
						if(piano!=pianos[i])
						{
							pianos[i].hide();
						}
					}
					return;
				}
			}
		}
	}
}

var hitPiano;