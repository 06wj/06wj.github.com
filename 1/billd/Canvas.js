
(function(){

/**
 * Constructor.
 * @name Canvas
 * @augments DisplayObject
 * @class Canvas类，可在画布上调用canvas的原始方法。
 */
var Canvas = Quark.Canvas = function(props)
{	
	this.canvas = null;
	this.graphics = null;

	props = props || {};
	Canvas.superClass.constructor.call(this, props);
	this.id = props.id || Quark.UIDUtil.createUID("Canvas");
	
	this.setDrawable();
};
Quark.inherit(Canvas, Quark.DisplayObject);

Canvas.prototype.setDrawable = function()
{ 
	this.canvas = Quark.createDOM("canvas", {width:this.width, height:this.height});
	this.graphics = this.canvas.getContext("2d");
	
	this.drawable = new Quark.Drawable(this.canvas, true);
};

})();