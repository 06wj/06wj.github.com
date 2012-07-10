var myCanvas = document.getElementById("main");
var graphics = myCanvas.getContext("2d");
var g = new Vector(0,.3);

function Star(x, y, r, n, color)
{
	this.loc = new Vector(x, y);
	this.r = r;
	this.n = n;
	this.color = color;
	this.v = new Vector((Math.random()- .5) * 8, Math.random() * - 5 + 10);
	this.g = new Vector(0, Math.random() * .9 + .2);
	
	this.angle = Math.random() * 3.14;
	this.angleV = Math.random() > .5 ? ( Math.random() * .5 + .2) : -1 * ( Math.random() * .5 + .2); 
	this.time = 0;
}

Star.prototype.run = function()
{
	this.loc.plus(v);
}

Star.prototype.updata = function()
{
	this.time ++;
	if(this.time > 200) this.r -= .1;
	this.drawBall();
  
	this.loc.plus(this.v);
	this.v.plus(this.g);
}

Star.prototype.die = function()
{
	if(this.r < 2) return true;
	else return false;
}

Star.prototype.draw = function()
{  
	var myCanvas = document.getElementById("main");
	var g = myCanvas.getContext("2d");
	
	var r = this.r;
	var n = this.n;
	var color = this.color;
	var x = this.loc.x;
	var y = this.loc.y;
	
	g.save();  
	g.beginPath()  
	g.translate(x,y);
	this.angle += this.angleV;
	g.rotate(this.angle);
	g.moveTo(r,0);  
	
	g.fillStyle = color;  
	g.strokeStyle = color; //randomColor();  
	g.lineWidth = 1;
	
	for (var i=0;i<n * 2 - 1;i++)
	{  
		 g.rotate(Math.PI/n);  
		 
		 if(i%2 == 0) 
		 {  
			g.lineTo((r/0.525731)*0.200811,0);  
		 } 
		 else 
		 {  
			g.lineTo(r,0);  
		 }
	}
	g.closePath();  
	//g.stroke(); 
	g.fill();
	g.restore(); 
}  
 
function randomColor()
{
	var r,g,b;
	
	r = parseInt(Math.random() * 255) + 100;
	g = parseInt(Math.random() * 255) + 100;
	b = parseInt(Math.random() * 255) + 100;	
	
	return ('rgb('+ r +','+ g + ','+  b +')');
}

Star.prototype.drawBall = function()
{  
	var myCanvas = document.getElementById("main");
	var g = myCanvas.getContext("2d");
	
	g.fillStyle = "#fff"//this.color;
	g.beginPath();
	g.arc(this.loc.x, this.loc.y, 2, 0, Math.PI*2, true);
	g.closePath();
	g.fill();
 }
 
 
 
 
 
 
 
 
 