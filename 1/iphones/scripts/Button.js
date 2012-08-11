var btnCanvas = document.getElementById('btn');
var btnContext = btnCanvas.getContext('2d');

var btnStart = {
	draw:function(frame)
	{
		btnCanvas.style.left = '290px';
		btnCanvas.style.top = '247px';
		btnContext.drawImage(assets['btnStart'], frame * 123, 0, 123, 52, 0, 0, 153, 52);
	}
};

var btnAgain = {
	draw:function(frame)
	{
		btnCanvas.style.left = '145px';
		btnCanvas.style.top = '175px';
		btnCanvas.width = 143;
		btnCanvas.height = 41;
		
		btnContext.drawImage(assets['btnAgain'], frame * 143, 0, 143, 41, 0, 0, 143, 41);
	}
}

function gameAgain()
{
	score = 0;
	key = {};
	gameOver.time = 0;
	gameStart.time = 0;
	gameState = 'gameStart';
	btnCanvas.onmouseover = function(){return;};
	btnCanvas.onmouseout = function(){return;};
	btnCanvas.onmousedown = function(){return;};
	btnCanvas.ontouchstart = function(){return;};
	btnCanvas.onmouseup = function(){return;};
	btnCanvas.ontouchend = function(){return;};
}

btnCanvas.onmouseover = function(){btnStart.draw(0);};
btnCanvas.onmouseout = function(){btnStart.draw(2);};
btnCanvas.ontouchstart = function(){btnStart.draw(1);};
btnCanvas.onmousedown = function(){btnStart.draw(1);};
btnCanvas.ontouchend = function(){btnContext.clearRect(0, 0, btnCanvas.width, btnCanvas.height);gameState = 'gameStart';gameAgain()};
btnCanvas.onmouseup = function(){btnContext.clearRect(0, 0, btnCanvas.width, btnCanvas.height);gameState = 'gameStart';gameAgain()};