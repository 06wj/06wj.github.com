var ballImages = [];
var balls = [];
var r = 14;
var pb,ex,ey;

var ballNum = 1;


(function(){
	for(var i = 0; i < 100; i ++)
	{
		ballImages[i] = new Image();
		ballImages[i].src = createImage();	
	}
	ballImages[0].src = createImage("#fff");
	ballImages[49].src = createImage("#fff");
	
	function createImage(color)
	{
		var canvas = Q.createDOM('canvas',{width:4*r,height:4*r});
		var context = canvas.getContext('2d');
		context.moveTo(r, r);
		var co = color|| ("#" + parseInt(Math.random()*0xffffff).toString(16));
	
		context.fillStyle = co;
		context.fillRect(0, 0, 4*r, 4*r);
	
		context.fillStyle = "#fff";
		//context.fillRect(0, r - 15, 4 * r, 30);
		//context.fillRect(0, 3*r - 15, 4 * r, 30);
		context.arc(r, r, r/3*2, 0, Math.PI*2);
		//context.arc(3*r, 3*r, 20, 0, Math.PI*2);
		context.fill();
	
		context.fillStyle = co;
		context.textAlgin = "middle";
		context.textBaseline = "middle";
		context.font = r + "px/1 tahoma, Srial, helvetica, sans-serif";
		context.fillText(ballNum,r - r/3, r);
		context.fillText(ballNum,3 * r - 10, 3 * r);
		ballNum++;
		if(ballNum == 10) ballNum = 1;
		
		
		var url = canvas.toDataURL();
		return url;		
	}
})();



function Ball(props)
{
	
	this.v = new Vector();
	
	this.rx = 0;
	this.ry = 0;
	
	this.vz = 0;
	this.light = null;
	
	this.constructor.superClass.constructor.call(this, props);
	this.loc = new Vector(this.x, this.y);
}
Q.inherit(Ball, Q.Bitmap);


Ball.prototype.update = function()
{
	//this.checkLine(l1);
	
	this.loc.plus(this.v);
	this.bounce();
	
	this.v.scale(.99);
	
	this.x = this.loc.x;
	this.y = this.loc.y;
	if(this.light) this.light.x = this.loc.x;
	if(this.light) this.light.y = this.loc.y;
	this.setRect([this.rx, this.ry, 2*r, 2*r]);
	
	this.rx -= this.v.x;
	this.ry -= this.v.y;
};

Ball.prototype.bounce = function()
{
	/*var scale = 1;
	
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
	}*/
	for(var i = 0,l = lines.length;i < l;i++)
	{
		this.checkLine(lines[i])
	}
};



Ball.prototype.checkLine = function(line){
	var ang = line.p1.minusNew(line.p2).getAngle();

	line.p1.rotate(-ang);
	line.p2.rotate(-ang);
	
	this.loc.rotate(-ang);
	this.v.rotate(-ang);

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
	}
	
	line.p1.rotate(ang);
	line.p2.rotate(ang);
	this.loc.rotate(ang);
	this.v.rotate(ang);
};

var a3 = Math.sqrt(3)+.1;
var ar = r ;
var ballxy = [
	0, -330, 0, 0, -ar,a3*ar,ar,a3*ar,-2*ar,2*a3*ar,0,2*a3*ar,2*ar,2*a3*ar,-3*ar,3*a3*ar,-ar,3*a3*ar,r,3*a3*ar,3*ar,3*a3*ar
];

function addBalls(num)
{
	var ball, i;
	for(i = 0; i < num; i++)
	{
		var ix = i%7;
		var iy = parseInt(i/7);
		if(i < 11) ball = new Ball({image:ballImages[i],width:2*r,height:2*r,regX:r,regY:r,x:600 + ballxy[2*i+1],y:219+ballxy[2*i],rect:[0, 0, 2*r, 2*r],light:new Q.Bitmap({image:light, regX:16,regY:16})});
		else ball = new Ball({image:ballImages[i],width:2*r,height:2*r,regX:r,regY:r,x:100,y:219,rect:[0, 0, 2*r, 2*r],light:new Q.Bitmap({image:light, regX:16,regY:16})});
		ball.light.scaleX = r/16;
		ball.light.scaleY = r/16;
		balls[i] = ball;
		stage.addChild(ball);
		stage.addChild(ball.light);
	}
	
	pb = new Ball({image:ballImages[49],width:2*r,height:2*r,regX:r,regY:r,rect:[0, 0, 2*r, 2*r]});
	stage.addChild(pb);
	pb.alpha = .3;
	pb.scaleX = 1;
	pb.scaleY = 1;
}

function updateBalls()
{
	var i,j,len = balls.length,ball1,ball2;
	var s,s1,t1,v1s,v2s,v1t,v2t,k,rr = 2 * r;
	
	for(var i = 0,len = balls.length; i < len - 1;i++)
	{	
		ball1 = balls[i];
		for(var j = i + 1;j < len;j++)
		{
			ball2 = balls[j];
			checkCollision(ball1, ball2);	
		}
	}
}

function rotate(x, y, sin, cos, reverse)
{
	var result = {};

	if(reverse) {
		result.x=x*cos+y*sin;
		result.y=y*cos-x*sin;
	} 
	else {
		result.x=x*cos-y*sin;
		result.y=y*cos+x*sin;
	}
	return result;
}


function checkCollision(ball0, ball1)
{
	var s = ball0.loc.minusNew(ball1.loc);
		if(s.getLength() < 2*r)
		{
			var ang = s.getAngle();

			s.rotate(-ang);
			ball0.loc.rotate(-ang);
			ball0.v.rotate(-ang);
			ball1.loc.rotate(-ang);
			ball1.v.rotate(-ang);

			s =2*r - Math.abs(ball0.loc.x - ball1.loc.x);
			if(ball0.loc.x <　ball1.loc.x){
				ball0.loc.x -= s/2;
				ball1.loc.x += s/2;
			}
			else{
				ball0.loc.x += s/2;
				ball1.loc.x -= s/2;
			}

			var tempV = ball0.v.x;
			ball0.v.x = ball1.v.x;
			ball1.v.x = tempV;

			ball0.loc.rotate(ang);
			ball0.v.rotate(ang);
			ball1.loc.rotate(ang);
			ball1.v.rotate(ang);
		}
}


	


