var hasGround = true;

var ground = 
{
	y:0,
	draw:function()
	{
		this.y += 2;
		if(this.y > 499) this.y = 1;
		
		var myCanvas = document.getElementById("main");
		var g = myCanvas.getContext("2d");
		var img = document.getElementById("groundImg");
		
		if(hasGround)
		{
			var y1 = this.y;
			var y2 = 500 - this.y;
			
			g.drawImage(img, 0, y2, 500, y1, 0, 0, 500, y1) ;
			g.drawImage(img, 0, 0, 500, y2, 0, this.y, 500, y2) ;
		}
		else
		{
			g.fillRect(0, 0, 500, 500);
		}
	}
}


