
(function(){
	
var ns = Q.use("BallGame");

var Num = ns.Num = function(props)
{
	this.num = 0;
	props = props || {};
	Num.superClass.constructor.call(this, props);
	this.id = props.id || Q.UIDUtil.createUID("Num");
	
	if(!this.max) this.max = 1;

	this.width = this.max * 20;
	this.height = 24;

	this.init();
};
Q.inherit(Num, Q.DisplayObjectContainer);

Num.prototype.init = function()
{	
	this.rects = 
	[
		[0,0,20,24],
		[20,0,20,24],
		[40,0,20,24],
		[60,0,20,24],
		[80,0,20,24],
		[100,0,20,24],
		[120,0,20,24],
		[140,0,20,24],
		[160,0,20,24],
		[180,0,20,24]
	];
	
	for(var i = 0; i < this.max; i++)
	{
		var rect = this.rects[0];
		var n = new Q.Bitmap({image:ns.images["num"], rect:rect, x:(rect[2]-2)*i});
		this.addChild(n);
	}

	this.setValue(this.num);
};

Num.prototype.setValue = function(val)
{
	this.num = val;
	var str = val.toString(), len = this.children.length;
	while(str.length < len) str = "0" + str;
	for(var i = len - 1; i >=0; i--)
	{
		var n = this.getChildAt(i);
		n.setRect(this.rects[Number(str.charAt(i))]);
	}
};
	
})();