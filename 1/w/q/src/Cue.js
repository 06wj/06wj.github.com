(function(){
	var ns = Q.use("BallGame");
	
	ns.initCue = function()
	{
		var cue = ns.cue = ns.bitmaps["cue"];
		var mouse = ns.mouse;

		cue.regY = 15,cue.regX = 0;
		cue.update = function(){
			
		this.x = ns.whiteBall.x;
		this.y = ns.whiteBall.y;

		var px = mouse.x - this.x;
		var py = mouse.y - this.y;
		var ang = Math.atan2(py,px);
		
		this.rotation = ang/Math.PI*180 + 180;
		
		this.x -= (ns.power*3 + 10)* Math.cos(ang);
		this.y -= (ns.power*3 + 10) * Math.sin(ang);
		}
	}

	
	ns.initLine = function()
	{
		var line = ns.line = new Quark.Bitmap({image:ns.Ball.images[0], regX:0, width:1, height:3, rect:[16, 16, 1, 3]});
		line.alpha = .5;

		line.update = function()
		{
			var mouse = ns.mouse;
			
			this.x = ns.whiteBall.x;
			this.y = ns.whiteBall.y;
			
			var px = mouse.x - this.x;
			var py = mouse.y - this.y;
			var ang = Math.atan2(py,px);
			
			this.rotation = ang/Math.PI*180;
			
			this.scaleX = Math.sqrt(px*px+py*py) - ns.mouseR;
		}
		ns.stage.addChild(ns.line);
		
	}
})();