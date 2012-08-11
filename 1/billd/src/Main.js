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
	if(player.hitGround()) keyEvent();
}

function render()
{
	var i,particle;
	
	groundBack.render();
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

function keyEvent()
{
	if(keyState[K_RIGHT] )
	{
		player.moveRight();
	}
	else if(keyState[K_LEFT])
	{
		player.moveLeft();
	}
	else
	{
		player.stand();
	}
	
	if(keyState[K_UP])
	{
		player.jump();
	}
}

document.onkeydown = function(e) {
    e.preventDefault();
	keyState[e.keyCode] = true;
};
document.onkeyup = function(e) {
	keyState[e.keyCode] = false;
};


















