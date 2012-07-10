(function(){
	
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640, canvas.height = 480, canvas.style.position = "absolute";
document.body.style.background = "#000";
document.body.appendChild(canvas);

var Point = function(x, y)
{
	this.x = x||0;
	this.y = y||0;
};

Point.getLength = function(p1, p2)
{
	var x = p1.x - p2.x;
	var y = p1.y - p2.y;
	return x*x + y*y;
};

var Line = function()
{
	var a = arguments, l = a.length;
	if(l == 2)
	{
		this.p0 = a[0];
		this.p1 = a[1];
	}
	else if(l == 4)
	{
		this.p0 = new Point(a[0], a[1]);
		this.p1 = new Point(a[2], a[3]);
	}
}
Line.prototype.getPoint = function(t)
{
	var x = (this.p1.x - this.p0.x) * t + this.p0.x;
	var y = (this.p1.y - this.p0.y) * t + this.p0.y;
	return new Point(x, y);
};
Line.prototype.getAngle = function()
{
	var x = this.p1.x - this.p0.x;
	var y = this.p1.y - this.p0.y;
	return Math.atan2(y, x);
}


var Bezier = function(a)
{
	var l = a.length;
	if(l == 4)
	{
		this.p0 = a[0];
		this.p1 = a[1];
		this.p2 = a[2];
		this.p3 = a[3];
	}
	else if(l == 8)
	{
		this.p0 = new Point(a[0], a[1]);
		this.p1 = new Point(a[2], a[3]);
		this.p2 = new Point(a[4], a[5]);
		this.p3 = new Point(a[6], a[7]);
	}
	
	this.points = [];
	this.initPoints();
};

Bezier.prototype.getPoint = function(t)
{
	var l = new Line(new Line(new Line(this.p0, this.p1).getPoint(t), new Line(this.p1, this.p2).getPoint(t)).getPoint(t), 
    				 new Line(new Line(this.p1, this.p2).getPoint(t), new Line(this.p2, this.p3).getPoint(t)).getPoint(t)
            );
	return {p:l.getPoint(t),a:l.getAngle()}
};

Bezier.prototype.initPoints = function()
{
	var t = 0;
	while(t <= 1)
	{
		this.points.push(this.getPoint(t));
		t += .001;
	}
}

Bezier.getArrPoints = function(arr, step)
{
	var i, j, l, p, points;
	step = step*step||1;
	for(i = 0,l = arr.length, points = [];i < l;i ++)
	{
		p = arr[i].points;
		points = points.concat(p);
	}
	arr = [];
	i = 0,j = 1, l = points.length;
	while(i < l && j < l)
	{
		while(j < l-1 && Point.getLength(points[i].p, points[j].p) <  step)
		{
			j ++;	
		}
		arr.push(points[i]);
		i = j;
		j ++;
	}
	return arr;
}

var Utils = 
{
	testPoints:function(arr)
	{
		for(var i = 0,l = arr.length;i < l;i ++)
		{
			ctx.beginPath();
			ctx.arc(arr[i].p.x, arr[i].p.y, 1, 0, Math.PI*2);
			ctx.fill();
		}
	},
	createBeziers:function(arr)
	{
		var i, l, beziers, b, beziers, tmp;
		for(i = 1, l = arr.length, beziers = []; i < l;i ++)
		{
			tmp = [];
			tmp.push(arr[i - 1][4]);
			tmp.push(arr[i - 1][5]);
			b = new Bezier(tmp.concat(arr[i]));
			beziers.push(b);
		}
		return beziers;
	}	
};


var loc =  [

  	 [462.8, 0.3, 462.8, 0.3, 462.8, 0.3],

      [462.8, 0.3, 655.8, 262.6, 607.9, 415.6],

      [607.9, 415.6, 579.0, 491.6, 523.0, 401.8],

      [523.0, 401.8, 487.0, 295.9, 467.0, 206.6],

      [467.0, 206.6, 423.0, -9.0, 211.5, 63.6],

      [98.6, 134.9, 35.2, 350.8, 35.2, 357.4],

      [35.2, 357.4, 24.7, 423.4, 55.2, 428.4],

      [85.6, 433.4, 106.2, 417.8, 116.1, 356.9],

      [116.1, 356.9, 134.4, 99.6, 281.9, 100.2],

      [281.9, 100.2, 402.3, 73.3, 437.0, 258.0],

      [437.0, 258.0, 461.0, 347.3, 413.0, 400.6],

      [365.0, 454.0, 265.7, 476.0, 193.0, 388.0],

      [120.3, 300.0, 215.0, 162.0, 265.0, 169.3]
 ];


//----------------------------------- test Bezier ---------------------------------------------
var b = Utils.createBeziers(loc);
var loc = Bezier.getArrPoints(b,3);
Utils.testPoints(loc);
var i = 0;
var l = loc.length;
var n = 0;
var ls = 0;
var r = 0;
var hr = 0;
var v = 8;
var max = l>>1;

var c = 0;

var nr = 0;

function update()
{
	ctx.clearRect(0, 0, 640, 480);
	//Utils.testPoints(loc);
	ls += v;
	c+=.5;
	if(ls >= l) v*=-1,ls=l-1;
	if(ls < 0) v*=-1,ls=0;
	n = ls;
	ctx.beginPath();

	ctx.fillStyle = "hsl(" + c + ", 100%, 50%)";

	if(n < max)
	{
		nr = n/2;	
	}
	else
	{
		nr = (l-n)/2;
	}

	hr = nr>>1;
	for(i = 0;i < nr;i++)
	{
		r = i<hr?i:nr-i;
		ctx.arc(loc[n -hr + i].p.x, loc[n -hr + i].p.y, Math.pow(r,.5), 0, Math.PI*2)
	}
	
	ctx.fill();
}

window.onload = function()
{
	
	setInterval(update, 1000/60);
}
})();