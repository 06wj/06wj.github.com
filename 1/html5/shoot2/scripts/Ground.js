var ground = 
{
	x:0,
	y:0,
	draw:function()
	{
		if(this.x > 499) this.x = 1;
		else if(this.x < 1) this.x = 499;
		if(this.y > 499) this.y = 1;
		else if(this.y < 1) this.y = 499;
		
		var myCanvas = document.getElementById("main");
		var g = myCanvas.getContext("2d");
		var img = document.getElementById("groundImg");
		
		
		var x1 = this.x;
		var x2 = 500 - this.x;
		
		var y1 = this.y;
		var y2 = 500 - this.y;
		
		g.drawImage(img, x2, y2, x1, y1, 0, 0, x1, y1) ;
		g.drawImage(img, 0, 0, x2, y2, this.x, this.y, x2, y2) ;
		g.drawImage(img, 0, y2, x2, y1, this.x, 0, x2, y1) ;
		g.drawImage(img, x2, 0, x1, y2, 0, this.y, x1, y2) ;
		
	}
}

var ground2 = 
{
	x:0,
	y:0,
	draw:function()
	{
		var myCanvas = document.getElementById("main");
		var g = myCanvas.getContext("2d");
		var img = document.getElementById("ground2Img");
		
		this.x = (player.loc.x - 250) *1.4;
		this.y = (player.loc.y - 250) *1.4;
		g.drawImage(img, this.x + 350, this.y + 350, 500, 500, 0, 0, 500, 500) ;	
	}
}


