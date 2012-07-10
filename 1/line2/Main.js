window.onload = function()
{
	var Box = Game.Box,
  		Segment = Game.Segment,
		Snake = Game.Snake;
	
	var offsetX = document.getElementById("main").offsetLeft;
	var offsetY = document.getElementById("main").offsetTop;
	var mousePosition = {x:110,y:110};

	var b1= new Segment({x:400, y:300, width:120, height:15, v:.09});
	var b2 = new Segment({width:100, height:27, v:-.14, before:b1});
	var b3 = new Segment({width:60, height:27, v:.2, before:b2});
	new Segment({x:100, y:100, width:60, height:21, v:.4});
	var b4 = new Segment({width:40, height:15, v:-.7, before:b2});
    
	var snake,npc1,npc2;
	init();
	


	function loop()
	{
		Game.context.clearRect(0, 0, 800, 600);
		Box.render();
		
		//Snake.food.render();
		
		//snake.update();
		npc1.update();
		//npc2.update();
		npc1.wander();
		//npc2.wander();

		keyEvent();

		Game.fps ++;
	}

	/*
	document.onmousemove = function(e)
	{
		mousePosition.x = e.clientX - offsetX;
		mousePosition.y = e.clientY - offsetY;
	}
	*/

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

		//snake = new Snake({loc:new Vector(300,300)});
		npc1 = new Snake({loc:new Vector(300,300)});
		npc1.add();
		//npc2 = new Snake({loc:new Vector(300,300)});
	}
};