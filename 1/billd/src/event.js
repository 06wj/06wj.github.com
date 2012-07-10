(function(){
	
	var ns = Q.use("billd");

	var keyState = ns.keyState = {};
	
	ns.initEvent = function()
	{
		if(Q.supportTouch)
		{
			ns.game.container.ontouchstart = function(e)
			{
				e.preventDefault();
				keyState[Q.KEY.UP] = true;
			};
			ns.game.container.ontouchend = function(e)
			{
				e.preventDefault();
				keyState[Q.KEY.UP] = false;
			};
			
			window.ondeviceorientation =  function(e) 
			{
				var ang;
				var o = window.orientation;
				if(o == 90){
					ang = e.beta;
				}
				else if(o == -90){
					ang = -e.beta;
				}
				else if(o == 0){
					ang = e.gamma;	
				}

				if(ang > 5) 
				{
					keyState[Q.KEY.RIGHT] = true;
				}
				else if(ang < -5) 
				{
					keyState[Q.KEY.LEFT] = true;
				}
				else
				{
					keyState[Q.KEY.RIGHT] = false;
					keyState[Q.KEY.LEFT] = false;
				}
			}
		}
		else
		{
			document.onkeydown = function(e) 
			{
			    e.preventDefault();
				keyState[e.keyCode] = true;
			};
			document.onkeyup = function(e) 
			{
				e.preventDefault();
				keyState[e.keyCode] = false;
			};
		}
		
	};
	
	ns.keyEvent = function()
	{
		if(keyState[Q.KEY.RIGHT])
		{
			ns.player.move(1);
		}
		else if(keyState[Q.KEY.LEFT])
		{
			ns.player.move(-1);
		}
		else
		{
			ns.player.walk();
		}
		
		if(keyState[Q.KEY.UP] && ns.player.hitGround())
		{
			ns.player.jump();
		}
	};

	
})();



















