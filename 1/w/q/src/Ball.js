(function(){
	var ns = Q.use("BallGame");
	var r = ns.r;
	
	var lines = ns.lines;
	var Ball = ns.Ball = function(props){
		this.num = 0;
		this.v = new Vector()//Math.random()*10,Math.random()*10);
		
		this.rx = 0;
		this.ry = 0;
		
		this.constructor.superClass.constructor.call(this, props);
		this.width = 32;
		this.height = 32;

		this.loc = new Vector(this.x, this.y);
		this.bitmap = new Quark.Bitmap({image:images[this.num],width:2*r,height:2*r,regX:r,regY:r,x:16, y:16, rect:[0, 0, 2*r, 2*r], eventEnabled:false});
		this.light = new Quark.Bitmap({image:ns.images["light"], regX:16, regY:16, x:16, y:16, eventEnabled:false});
		
		this.init();
	}	
	var balls = Ball.balls = [];
	var images = Ball.images = [];
	Ball.scale = .99;
	Quark.inherit(Ball, Quark.DisplayObjectContainer);

	Ball.prototype.init = function()
	{
		this.addChild(this.bitmap)
		this.addChild(this.light);
		//this.light.visible = false
		this.type = this.num == 0?0:this.num < 8?1:this.num==8?8:-1;
	}

	function createImage(col, num)
	{
		var canvas = Q.createDOM('canvas',{width:4*r,height:4*r});
		var context = canvas.getContext('2d');
		context.moveTo(r, r);
	
		context.fillStyle = col;
		context.fillRect(0, 0, 4*r, 4*r);

		if(num){
			context.fillStyle = "#eee";
			if(num > 8 ){	
				context.fillRect(0, 0, 4*r, r/3);
				context.fillRect(0, 2*r-r/3, 4*r, r/3*2);
				context.fillRect(0, 4*r-r/3, 4*r, r/3);

				context.arc(r + 2*r, r + 2*r, r/3*2, 0, Math.PI*2);
				context.fill();	
				
				context.fillStyle = col;
				context.textAlign = "center";
				context.textBaseline = "middle";
				context.font = r + "px/1 Consolas, tahoma, Srial, helvetica, sans-serif";
				context.fillText(num,3*r, 3*r);
			}
			context.fillStyle = "#eee";
			context.beginPath();
			context.arc(r, r, r/3*2, 0, Math.PI*2);
			context.arc(3*r, 3*r, r/3*2, 0, Math.PI*2);
			context.fill();	
			context.fillStyle = col;
			context.textAlign = "center";
			context.textBaseline = "middle";
			context.font = r + "px/1 Consolas, tahoma, Srial, helvetica, sans-serif";
			context.fillText(num,r, r);
			context.fillText(num,3*r, 3*r);
		}

		var url = canvas.toDataURL();
		return url;		
	}
							
	function createBallImages()
	{
		var colors = ["#ffffff", "#E1AE07", "#064771", "#D7141A", "#1E1D63", "#E9520B", "#0A5326", "#900910", "#000"];
		for(var i = 0;i < 9;i++){
			images[i] = new Image();
			images[i].src = createImage(colors[i], i);
		}
		for(i = 0;i < 8;i++){
			images[i+9] = new Image();
			images[i+9].src = createImage(colors[i+1], i+9);
		}
	}

	Ball.createBalls = function(){
		createBallImages();

		var a3 = Math.sqrt(3)+.1;
		var ar = r;
		var ballxy = [
			0, -330, 0, 0, -ar,a3*ar,ar,a3*ar,-2*ar,2*a3*ar,0,2*a3*ar,2*ar,2*a3*ar,-3*ar,3*a3*ar,-ar,3*a3*ar,ar,3*a3*ar,3*ar,3*a3*ar,-4*ar,4*a3*ar,-2*ar,4*a3*ar,0,4*a3*ar,2*ar,4*a3*ar,4*ar,4*a3*ar
		];
        
		
		for(var i = 0;i < 16;i++){
			var ball = new Ball({num:i, regX:16, regY:16, x:600 + ballxy[2*i+1] + ns.offset.x,y:219+ballxy[2*i] + ns.offset.y});
			Ball.balls[i] = ball;
			ns.stage.addChild(ball);
		}

		ns.whiteBall = ns.Ball.balls[0];
		ns.whiteBall.alpha = 1;

		ns.stage.addChild(ns.whiteBall);
	};

	

	Ball.prototype.move = function()
	{
		if(this.v.getLength() < .1)
		{

			this.v.x = 0;
			this.v.y = 0;
            return;
		}
        
        this.loc.plus(this.v);
		this.bounce();
		
		this.v.scale(Ball.scale);
		//this.v.setLength(this.v.getLength()-.13);
		
		this.x = this.loc.x;
		this.y = this.loc.y;
				
		this.bitmap.setRect([this.rx, this.ry, 2*r, 2*r]);
		this.bitmap.rotation = this.v.getAngle() *180/Math.PI;

		this.rx -= this.v.getLength();
	
		this.checkHole();
	}

	Ball.prototype.update = Ball.prototype.move;

	Ball.prototype.checkHole = function()
	{
		var hole = ns.holePoint;
		
		for(var i = 0;i < 6;i++)
		{
			var lx = this.x - hole[i][0] - ns.offset.x;
			var ly = this.y - hole[i][1] - ns.offset.y;
			
			if(lx*lx+ly*ly < 500 && !this.isDie)
			{
				m()
				this.isDie = true;
				this.update = this.inHole;
				ns.Ball.type.push(this.type);
				console.log(this.num);
				return;
			}
		}
	};

	Ball.prototype.inHole = function()
	{
		if(this.alpha <.1 || this.scaleX <.1 || this.scaleY <.1) 
		{
			this.update = this.num ==0?null:function()
			{
				this.x += 4;
				this.bitmap.setRect([this.rx, this.ry, 2*r, 2*r]);
				this.rx -= 4;
				this.bitmap.rotation = 0;
				if(this.x > ns.xx )
				{
					this.update = null;
					this.x = ns.xx;
					ns.xx = this.x - 2*r;
				}

			};
			this.v = new Vector();
			this.scaleX = 1;
			this.scaleY = 1;
			this.alpha = 1;
			if(this.num ==0)
			{
				this.visible = false;
			}
			this.x = ns.bitmaps["ballRoad"].x + r;
			this.y = ns.bitmaps["ballRoad"].y + ns.bitmaps["ballRoad"].height/2+1;
			
		};
		
		this.scaleX -= .07;
		this.scaleY -= .07;
		this.alpha  -= .07;
	};

	Ball.prototype.bounce = function()
	{
		var scale = .999;
		var a = 0;
		minx = ns.offset.x + 27 - a;
		miny = ns.offset.y + 28 - a;
		maxx = ns.offset.x + 818 + a;
		maxy = ns.offset.y + 408 + a;
		
		
		for(var i = 0,l = lines.length;i < l;i++)
		{
			if( this.checkLine(lines[i]))
			{
				//console.log(this.num + " hit")
				return;
			};
		}
		
		if(this.loc.x < minx || this.loc.y < miny || this.loc.x > maxx || this.loc.y > maxy && !this.isDie){
			this.isDie = true;
			this.update = this.inHole;
			ns.Ball.type.push(this.type);
			console.log(this.num + "aaaaaaaaaaaaaaaaaaaaaaaaa lose")
			return;			
		}
		/*
		if(this.loc.x < minx + r) 
		{
			this.loc.x = minx + r;
			this.v.x *= -scale;
		}
		else if(this.loc.x >maxx - r)
		{
			this.loc.x = maxx - r;
			this.v.x *= -scale;
		}
		if(this.loc.y < miny + r)
		{
			this.loc.y = miny + r;
			this.v.y *= -scale;
		}
		else if(this.loc.y > maxy - r)
		{
			this.loc.y = maxy - r;
			this.v.y *= -scale;
		}			
        */
	};

	Ball.prototype.touchMove = function()
	{
		if(ns.isDown)
		{
			this.update = this.checkBounds();
		}	
	};

	Ball.prototype.checkBounds = function()
	{
		minx = ns.offset.x + 27;
		miny = ns.offset.y + 28;
		maxx = ns.offset.x + 818;
		maxy = ns.offset.y + 408;
		
		this.loc.x = ns.mouse.x;
		this.loc.y = ns.mouse.y;

		if(this.loc.x < minx + r) 
		{
			this.loc.x = minx + r;
		}
		else if(this.loc.x >maxx - r)
		{
			this.loc.x = maxx - r;
		}
		if(this.loc.y < miny + r)
		{
			this.loc.y = miny + r;
		}
		else if(this.loc.y > maxy - r)
		{
			this.loc.y = maxy - r;
		}
		
		this.x = this.loc.x;
		this.y = this.loc.y;
		
		for(var i = 1,l = balls.length,x = r*r*4; i < l;i++)
		{
			var a1 = this.loc.x - balls[i].loc.x;
			var a2 = this.loc.y - balls[i].loc.y;
			if((a1*a1+a2*a2) <= x)
			{
				this.alpha = .5;
				if(Q.supportTouch)
				{
					ns.whiteBall.isDown = false;
				}
				return;
			}
		}

		this.alpha = 1;

		if(ns.whiteBall.isDown && ns.isDown)
		{
			this.update = this.move;
			this.isDie = false;	
			ns.startShoot();
			if(!Q.supportTouch) ns.isDown = false;
		}
	}; 

	Ball.prototype.checkLine = function(line){
		var ang = line.p1.minusNew(line.p2).getAngle();
		var temp = false;
		var cos = Math.cos(ang);
		var sin = Math.sin(ang);
		var r = ns.r; 

		if(this.v.getLength()>r)
		{
			r = this.v.getLength();
		}

		line.p1.rotate(cos, -sin);
		line.p2.rotate(cos, -sin);
		
		this.loc.rotate(cos, -sin);
		this.v.rotate(cos, -sin);

		var y = line.p1.y;
		var x1 = line.p1.x;
		var x2 = line.p2.x;
		if(x1 > x2){var xx = x1;x1 = x2;x2 =xx}
		var by = this.loc.y;
		var bx = this.loc.x;
		var vy = this.v.y;
		if(bx > x1 && bx < x2 && (by + r > y && by - r < y))
		{
			this.loc.y = this.v.y>0?y-r:y+r;
			this.v.y *= -1;
			temp = true;
		}
		
		line.p1.rotate(cos, sin);
		line.p2.rotate(cos, sin);
		this.loc.rotate(cos, sin);
		this.v.rotate(cos, sin);

		return temp;
	};

	function isStop()
	{
		var temp = true;
		for(var i = 0,len = balls.length;i < len;i++){
			if(balls[i].v.getLength() > .01){
				temp = false;

			}
		}
		return temp;
	};

	function afterStop()
	{
		var rightBall = false;
		var type = Ball.type;
		var len = Ball.type.length;
		var white = false;

		if(len == 0){
			ns.setBad();
			return;
		}
		else{
			for(var i = 0;i < len;i++){
				if(type[i]==8){                 //黑球
					if(ns.player.num != 7){
						ns.setLose();}
					else{
						ns.setWin();
					}
					return;
				} 
				else if(type[i]==0){            //白球
					white = true;
				}
			}
			
			for(var i = 0;i < len;i++){
				if(!ns.player.type && type[i] != 0){       //没分花色
					ns.initPlayerType(type[i]);
					if(!white){
						ns.player.addScore(10);
						rightBall = true;
					}
					ns.player.num++;
				}
				else if(ns.player.type == type[i]){ //进球颜色和自己相同
					if(!white){
						ns.player.addScore(10);
						rightBall = true;
					}
					ns.player.num++;
				}
				else if(ns.player.next.type == type[i]){
					ns.player.next.num++;
				}
			}
			console.log(ns.player1.num + " " +ns.player2.num)
			if(white){
				ns.changePlayer();
				ns.whiteBall.isDown = Q.supportTouch?false:true;
				ns.whiteBall.visible = true;
				ns.whiteBall.update = ns.Ball.prototype.checkBounds;
				return;
			}

			if(rightBall){
				ns.setGood();
			}
			else{
				ns.setBad();
			}
		}
		
	}

	Ball.update = function()
	{
		if(isStop())
		{
			ns.loop = function(){};
			afterStop();
			return;
		}

		var i,j,len = balls.length,ball1,ball2;
		var s,s1,t1,v1s,v2s,v1t,v2t,k,rr = 2 * r;
		for(var i = 0,len = balls.length; i < len - 1;i++)
		{	
			ball1 = balls[i];
			if(ball1.isDie && ball1.num!=0){
				balls.splice(i, 1);
				len--;
				i --;
				continue;
			}
			for(var j = i + 1;j < len;j++)
			{
				ball2 = balls[j];
				checkCollision(ball1, ball2);	
			}
		}
	}

	function checkCollision(ball0, ball1)
	{	
		if(ball0.isDie || ball1.isDie) return;

		var vl0 = ball0.v.getLength(), vl1 = ball1.v.getLength();
		if(vl0 < .1 && vl1 < .1) {
			return ;
		}
		
		var s = ball0.loc.minusNew(ball1.loc);
			if(s.getLength() <= 2*r)
			{
				var ang = s.getAngle();
				var sin = Math.sin(ang);
				var cos = Math.cos(ang);																															
				s.rotate(cos, -sin);
				ball0.loc.rotate(cos, -sin);
				ball0.v.rotate(cos, -sin);
				ball1.loc.rotate(cos, -sin);
				ball1.v.rotate(cos, -sin);
						
				s =2*r - Math.abs(ball0.loc.x - ball1.loc.x);
				
				if(ball0.v.x == 0){
					ball1.loc.x -= ball1.v.x > 0?s:-s;
					ball1.loc.y -= ball1.v.y * s/Math.abs(ball1.v.x);
				}
				else if(ball1.v.x == 0){
					ball0.loc.x -= ball0.v.x > 0?s:-s;
					ball0.loc.y -= ball0.v.y * s/Math.abs(ball0.v.x);
				}
				else if(ball0.loc.x < ball1.loc.x){
					ball0.loc.x -= s*.5;
					ball1.loc.x += s*.5;
				}
				else{
					ball0.loc.x += s*.5;
					ball1.loc.x -= s*.5;
				}

				ball0.loc.rotate(cos, sin);
				ball0.v.rotate(cos, sin);
				ball1.loc.rotate(cos, sin);
				ball1.v.rotate(cos, sin);

				s = ball0.loc.minusNew(ball1.loc);
				ang = s.getAngle();
				sin = Math.sin(ang);
				cos = Math.cos(ang);
																																			
				s.rotate(cos, -sin);
				ball0.loc.rotate(cos, -sin);
				ball0.v.rotate(cos, -sin);
				ball1.loc.rotate(cos, -sin);
				ball1.v.rotate(cos, -sin);

				var tempV = ball0.v.x;
				ball0.v.x = ball1.v.x;
				ball1.v.x = tempV;

				ball0.loc.rotate(cos, sin);
				ball0.v.rotate(cos, sin);
				ball1.loc.rotate(cos, sin);
				ball1.v.rotate(cos, sin);

			}	
	}
	
})();