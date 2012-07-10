function Star(x, y, r, n, color)//分别代表x,y,半径，边数，颜色
{
	this.loc = new Vector(x, y);//位置向量
	this.r = r;
	this.n = n;
	this.color = color;
	this.v = new Vector((Math.random()- .5) * 8, Math.random() * - 5 + 1);//随机速度
	this.g = new Vector(0, Math.random() * .2 + .1);//随机重力加速度
	
	this.angle = Math.random() * 3.14;//随机角度
	this.angleV = .2; //随机角速度
	this.time = 0;//时间
	this.stars = [];//子星星
	this.big = false;//默认为小星星
}

Star.prototype.run = function()
{
	this.loc.plus(this.v);//更新位置
	this.v.plus(this.g);//更新速度
}

Star.prototype.addStar = function()//增加一个小星星
{
	var x, y, r, n, color;
	x = this.loc.x;
	y = this.loc.y;
	r = Math.random() * 4 + 1;
	n = parseInt(Math.random() * 4) + 3;
	color = randomColor();
	var star = new Star(x, y, r, n, color);
	this.stars.push(star);
}

Star.prototype.updata = function()
{
	if(!this.big) //如果不是大星星就随着时间增加，半径减少
	{
		this.time ++;
		if(this.time > 10) this.r -= .1;
	}
	
	else//是大星星，就不停的生成小星星
	{
		var stars = this.stars;
		this.addStar();
		
		for(var i = 0 ; i < stars.length ; i ++)
		{
			stars[i].updata();
			stars[i].draw();
			if(stars[i].die())//如果一个小星星死亡，就删掉它
			{
				stars.splice(i, 1);
				i --;
			}
			
		}
	}
	
	this.run();//更新
}

Star.prototype.die = function()//死亡条件
{
	if(this.r < 1 || this.loc.x > 800 || this.loc.x < 0 || this.loc.y > 600 || this.loc.y < 0) return true;
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
	
	//g.shadowBlur= 8; 
	//g.shadowOffsetX = 4; 
	//g.shadowOffsetY= 4; 
	
	
	
	g.beginPath()  
	g.translate(x,y);
	this.angle += this.angleV;
	g.rotate(this.angle);//旋转角度
	g.moveTo(r,0);  
	
	g.fillStyle = color;  
	g.shadowColor= color; ;
	
	for (var i=0;i<n * 2 - 1;i++)//画星星形状
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
	g.fill();
	g.restore(); 
}  
 
function randomColor()//随机颜色，为了是颜色亮点，各增加了100
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
	
	g.fillStyle = this.color;
	g.beginPath();
	g.arc(this.loc.x, this.loc.y, 1, 0, Math.PI*2, true);
	g.closePath();
	g.fill();
 }
 
 
 
 
 
 
 
 
 