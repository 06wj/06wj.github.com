function initEvent()
{
	window.onclick = function(e)
	{
		var vx = pb.loc.x - balls[0].loc.x;
		var vy = pb.loc.y - balls[0].loc.y;
		if(!pb.visible) return;
		balls[0].v = new Vector(vx, vy);
		balls[0].v.setLength(power);	
	};

	window.onmousemove = function(e)
	{
		ex = e.clientX;
		ey = e.clientY;
		power = line.scaleX/15;
	};

	stage.container.ontouchstart = function(e)
	{
		e.preventDefault();
		ex =  e.changedTouches[0].clientX;
		ey =  e.changedTouches[0].clientY;
	};
	
	stage.container.ontouchmove = function(e)
	{
		e.preventDefault();
		ex = e.changedTouches[0].clientX;
		ey = e.changedTouches[0].clientY;
	};
	
	stage.container.ontouchend = function(e)
	{
		e.preventDefault();
		var vx = pb.loc.x - balls[0].loc.x;
		var vy = pb.loc.y - balls[0].loc.y;
		if(!pb.visible) return;
		balls[0].v = new Vector(vx, vy);
		balls[0].v.setLength(power);	
	};	

	initBalls();		
}