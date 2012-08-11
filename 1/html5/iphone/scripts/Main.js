var keyState = {};
var fps = 30;
var particles = [];

function init()
{
	hitGround.getData();
	setInterval('loop()', 1000/fps);
}

function loop()
{
	render();
	if(player.hitGround())touchEvent();
}


doucment.addEventListener("touchstart",isTouch,false);
doucment.addEventListener("touchmove",isMove,false);
doucment.addEventListener("touchend",isEnd,false);
function isTouch(e)
{
	e.preventDefault();
	player.jump();
}

function isEnd(e)
{
	e.preventDefault();
	player.jump();
}

function isMove(e)
{
	e.preventDefault();
	player.jump();
}

function touchEvent()
{
	//if(key["jump"]) player.jump();
}

function render()
{
	var i,particle;
	
	
	//groundBack.render();
	ground.render();
	player.render();
	
	
	for(i = 0; i < particles.length;i++)
	{
		particle = particles[i];
		particle.render();
		if(particle.isDie)
		{
			particles.splice(i, 1);
			i --;
		}
	}
	
}



document.onkeydown = function(e) {
    e.preventDefault();
	keyState[e.keyCode] = true;
};
document.onkeyup = function(e) {
   
	keyState[e.keyCode] = false;
};


















