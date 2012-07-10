(function(){
	var Segment = Game.Segment = function(props)
	{
		this.v = 0;
		this.before = null;

		Game.Box.call(this, props);
	};
	Segment.prototype = new Game.Box();
	Segment.prototype.construstor = Segment;

	Segment.prototype.update = function()
	{
	    this.rotation +=  this.v/2;
	    if(!!this.before)
	    {
	        this.x = this.before.getBottomX();
	        this.y = this.before.getBottomY();
	    }
	};
})();