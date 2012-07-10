var gameStart = 
{
	time:0,
	type:0,
	addBombs:function()
	{
		var bomb, x, y, type;
		var type = tool.random(1, 7, true);
		
		x = tool.random(80, 420);
		y = tool.random(80, 420);
		
		
		for(var i = 0 ; i < 30; i ++)
		{
			bomb = new Bomb(x, y, this.type);
			bombs.push(bomb);
		}
	},
	
	update:function()
	{
		this.time++;
		if(this.time % 5 == 0)
		{
			if(this.time % 200 == 0)
			{
				this.type ++;
				if(this.type > 6) this.type = 0;
			}
			this.addBombs();
		}
	}
}