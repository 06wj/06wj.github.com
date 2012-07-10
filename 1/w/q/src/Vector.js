function Vector(xx, yy)
{
	this.x = xx||0;
	this.y = yy||0;
}

//重置
Vector.prototype.reset = function(xx, yy)
{
	this.x=xx;
	this.y=yy;
}
//	----------------getClone----------------------------------------------
//	复制
Vector.prototype.getClone = function()
{
	return new Vector(this.x,this.y);
}
// ---------------------cut---------------------------------------------
//截断
Vector.prototype.cut = function(max)
{
	var r = Math.min(max, this.getLength());
	this.setLength(r);	
}
// ---------------------cutNew---------------------------------------------
//截断
Vector.prototype.cutNew = function(max)
{
	var r= Math.min(max, this.getLength());
	var v = this.getClone();
	v.setLength(r);
	return v;	
}

//	----------------equals------------------------------------------------
//	比较是否相等
Vector.prototype.equals = function(v)
{
	return (this.x==v.x && this.y==v.y);
}
//	----------------plus--------------------------------------------------
//	加法,改变当前对象
Vector.prototype.plus = function(v)
{
	this.x += v.x;
	this.y += v.y;	
}
//	----------------plusNew-----------------------------------------------
//	求和,返回新对象
Vector.prototype.plusNew = function(v)
{
	return new Vector(this.x+v.x,this.y+v.y);
}
//	----------------minus-------------------------------------------------
//	减法,改变当前对象
Vector.prototype.minus = function(v)
{
	this.x -= v.x;
	this.y -= v.y;
}
//	----------------minusNew----------------------------------------------
//	求差,返回新对象
Vector.prototype.minusNew = function(v)
{
	return new Vector(this.x-v.x,this.y-v.y);
}
//	----------------negate------------------------------------------------
//	求逆,改变当前对象
Vector.prototype.negate = function()
{
	this.x = - this.x;
	this.y = - this.y;
}
//	----------------negateNew---------------------------------------------
//	求逆,返回新对象
Vector.prototype.negateNew = function()
{
	return new Vector(-this.x,-this.y);
}
//	----------------scale-------------------------------------------------
//	缩放,改变当前对象
Vector.prototype.scale = function(s)
{
	this.x *= s;
	this.y *= s;
}
//	----------------scaleNew----------------------------------------------
//	缩放,返回新对象
Vector.prototype.scaleNew = function(s)
{
	return new Vector(this.x * s, this.y * s);
}
//	----------------getLength---------------------------------------------
//	获取向量长度
Vector.prototype.getLength = function()
{
	return Math.sqrt(this.x*this.x + this.y*this.y);
}
//	----------------setLength---------------------------------------------	
//	设置向量长度
Vector.prototype.setLength = function(len)
{
	var r = this.getLength();
	if (r) this.scale (len / r);
	else this.x = len;
}
//	----------------getAngle----------------------------------------------
//	获取向量角度
Vector.prototype.getAngle = function()
{
	return Math.atan2(this.y, this.x);
}
//	----------------setAngle----------------------------------------------
//	设置向量角度
Vector.prototype.setAngle = function(ang)
{
	var r = this.getLength();
	this.x = r * Math.cos (ang);
	this.y = r * Math.sin (ang);
}
//	----------------rotate------------------------------------------------
//	向量旋转，改变当前对象
Vector.prototype.rotate = function()
{  
	var cos, sin;
	var a = arguments;
	if(a.length == 1)
	{
		cos = Math.cos(a[0]);
		sin = Math.sin(a[0]);
	} 
	else
	{
		cos = a[0]
		sin = a[1]
	}
	var rx = this.x * cos - this.y * sin;
	var ry = this.x * sin + this.y * cos;
	this.x = rx;
	this.y = ry;
} 
//	----------------rotateNew---------------------------------------------
//	向量旋转，返回新对象
Vector.prototype.rotateNew = function(ang)
{
	var v=new Vector(this.x,this.y);
	v.rotate(ang);
	return v;
}
//	----------------dot---------------------------------------------------
//	点积
Vector.prototype.dot = function(v)
{
	return this.x * v.x + this.y * v.y;
}
//	----------------getNormal---------------------------------------------
//	法向量
Vector.prototype.getNormal = function()
{
	return new Vector(-this.y,this.x);
}
//	----------------isPerpTo----------------------------------------------
//	垂直验证
Vector.prototype.isPerpTo = function(v)
{
	return (this.dot (v) == 0);
}
//	----------------angleBetween------------------------------------------
//	向量的夹角
Vector.prototype.angleBetween = function(v)
{
	var dp = this.dot (v); 
	var cosAngle = dp / (this.getLength() * v.getLength());
	return Math.acos (cosAngle); 
}









