(function(){
	var ns = Q.use("BallGame");
	var stage = ns.stage;
	ns.initEvent = function()
	{
		var mouse = ns.mouse = {x:0,y:0};
		var balls = ns.Ball.balls;
		var stage = ns.stage;
		ns.power = 1;
		ns.powerV = .4;
		ns.isDown = false;

		window.onmousemove = function(e)
		{
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		window.onmousedown = function(e){
			ns.isDown = true;
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		}

		window.onmouseup = function(e){
            if(ns.isDown && ns.canShot){
				shoot(mouse.x, mouse.y);
				ns.canShot = false;
			}
			ns.isDown = false;	 
		}

		stage.container.ontouchstart = function(e)
		{
			e.preventDefault();
            ns.isDown = true;
		};
		
		stage.container.ontouchmove = function(e)
		{
			e.preventDefault();
			mouse.x = e.touches[0].clientX;
			mouse.y = e.touches[0].clientY;
		};
		
		stage.container.ontouchend = function(e)
		{
			e.preventDefault();
            if(ns.isDown && ns.canShot){
				shoot(mouse.x, mouse.y);
				ns.canShot = false;
			}

			if(ns.isDown && !ns.whiteBall.isDown)
			{
				ns.whiteBall.isDown = true;
			}

			ns.isDown = false;
		};		
	}

	function shoot(mouseX, mouseY){
		ns.loop = ns.Ball.update;

		var ball = ns.Ball.balls[0];
		var vx = mouseX - ball.loc.x;
		var vy = mouseY - ball.loc.y;

		ball.v = new Vector(vx, vy);
		ball.v.setLength(false||ns.power);
		
		ns.power = 1;
		ns.powerV = .4;
		ns.Ball.type = [];
		
		ns.cue.visible = false;
		ns.line.visible = false;
		ns.point.visible = false;	
	}



})();