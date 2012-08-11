var isMouseDown = false;
var mouseX = 0;
var mouseY = 0;
var fps = 30;
var canvasX = document.body.clientWidth/2 - 275;
var canvasY = 65;

window.onload = function()
{
	player1 = new Sprite(0, 0, "billd", 60, 60);
	player2 = new Sprite(200, 0, "billd", 60, 60);
	setInterval('loop()', 1000/fps);
}

function loop()
{
	context.clearRect(0, 0, 550, 400);
	player1.draw();
	player2.draw();
}

document.onmousemove = function(e) {
	mouseX = e.clientX  - canvasX;
	mouseY = e.clientY - canvasY;
	
	player1.move();
	player2.move();
	if(player1.hitTestObject(player2))
	{
		player1.alpha = .5;
	}
	else
	{
		player1.alpha = 1;
	}
}

document.onmouseup = function(e){
	player1.isDrug = false;
	player2.isDrug = false;
}

document.onmousedown = function(e){
	player1.checkDrug();
	player2.checkDrug();
}













