(function(){
	
	var Box = Game.Box;
	var SnakeBody = Game.SnakeBody = function(props)
	{
		this.before = null;
		
		props = props||{};
		Box.call(this,props);
	}

	SnakeBody.prototype = new Box();
	SnakeBody.prototype.construstor = SnakeBody;

	SnakeBody.prototype.update = function()
	{
		if(!!this.before)
		{
			var dx = this.before.x - this.x;
		    var dy = this.before.y - this.y;
		    this.rotation = Math.atan2(dy, dx);
		    
		    this.x = this.before.x - this.getBottomX() + this.x;
		    this.y = this.before.y - this.getBottomY() + this.y;
		}
	};
})()