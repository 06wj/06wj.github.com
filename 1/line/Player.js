(function(){
	var Snake = Game.Snake;
    var PlayerHead = function(props)
	{
			this.time = 0;
			this.r = 15;
			this.color = "#9f6";
			Game.merge(this, props);
	};

	PlayerHead.prototype.render = function()
	{
		var context = Game.context;
		this.time += 1;
        var lr;
        if(this.time > 70)
        {
            this.time = 0;
        }
        
		lr = this.time*.5;
        context.save();
        context.beginPath();
		context.fillStyle = this.color;
		context.globalAlpha = (90 - this.time)/80;
		context.arc(this.x, this.y, lr, 0, Math.PI*2);
		context.fill();
		
		context.restore();
	};
	
	var Player = Game.Player = function(props)
	{
		Snake.call(this,props);
		this.circle = new PlayerHead({x:this.x,y:this.y,r:this.head.height,color:this.color});
	};
	Player.prototype = new Snake();
	Player.prototype.construstor = Player;

	Player.prototype.eatFood = function()
    {
        var x = this.loc.x - Snake.food.x;
        var y = this.loc.y - Snake.food.y;
        var r = Snake.food.r + this.head.height*.5;
        if((x*x+y*y) < r*r)
        {
            this.add();
            this.circle.color = this.head.color = Snake.food.color;
            Snake.food.init();
        }
    };

    Player.prototype.update = function()
    {
    	Snake.prototype.update.call(this);
    	
		this.circle.x = this.head.x;	
    	this.circle.y = this.head.y;
    	this.circle.render();	
    };

})();