window.onload = function()
{
	var Box = Game.Box,
  		Segment = Game.Segment,
		Snake = Game.Snake,
		Player = Game.Player;
	
	var offsetX = document.getElementById("main").offsetLeft;
	var offsetY = document.getElementById("main").offsetTop;
	var mousePosition = {x:110,y:110};
	var snake, npc1, npc2;
	init();

	function loop()
	{
		Game.context.clearRect(0, 0, 800, 600);
		
		Snake.food.render();
		
	 	snake.update();
		npc1.update();
		npc2.update();
		
		snake.render();
		npc1.render();
		npc2.render();
		
		npc1.wander();
		npc2.wander(); 

		keyEvent();
		
		Game.fps ++;
	}

	function keyEvent()
	{
		var aa = -.1;
		if(Game.key[Game.keyCode.LEFT])
		{
			snake.v.rotate(aa);
		}
		else if(Game.key[Game.keyCode.RIGHT])
		{
			snake.v.rotate(-aa);
		}		
	}
	
	function init()
	{
		Game.initKeyEvent();
		Game.init("main", 60, loop);
		Game.setFps("fps");
		
		snake = new Player({loc:new Vector(300,300)});
		npc1 = new Snake({loc:new Vector(300,300)});
		npc2 = new Snake({loc:new Vector(300,300)});
	}
};