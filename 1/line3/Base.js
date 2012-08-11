(function(){
	var Game = window.Game = {};

	Game.init = function(canvasId, fps, loop)
	{
		Game.context = document.getElementById(canvasId).getContext("2d");
		setInterval(loop, 1000/fps);
	};

	Game.merge = function(obj, props, strict)
	{
		for(var key in props)
		{
			if(!strict || obj.hasOwnProperty(key)) obj[key] = props[key];
		}
		return obj;
	};

	Game.setFps = function(fpsId)
	{
		Game.fpsDiv = document.getElementById(fpsId);
		Game.fps = 0;
		Game.fpsDiv.innerHTML = 'fps:' + 60;
		setInterval(function(){
			Game.fpsDiv.innerHTML = 'fps:' + Game.fps;
			Game.fps = 0;
			}, 1000);	
	};

	Game.key = {};
	Game.initKeyEvent = function()
	{
		document.onkeydown = function(e)
		{
			Game.key[e.keyCode] = true;
			if(e.keyCode == Game.keyCode.UP)
			{
				//snake.add();
			}
		}
		document.onkeyup = function(e)
		{
			Game.key[e.keyCode] = false;
		}
	}

	Game.keyCode = {
		UP:38,
		DOWN:40,
		LEFT:37,
		RIGHT:39
	} ;
})();