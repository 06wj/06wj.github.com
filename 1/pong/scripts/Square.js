(function(){
	var Square = Game.Square = function(x, y, color)
    {
        this.elem = document.createElement("div");
        this.elem.setAttribute("class", "square " + color);
        this.color = color;
        
        this.x = x;
        this.y = y;
        this.id = Game.id ++;
        
        var angle = Math.random()*Math.PI*2;
        var v = 7;
        
        this.vx = Math.cos(angle) * v;
        this.vy = Math.sin(angle) * v;
        
        this.elem.style[Game.cssPrefix + "Transform"] = "translate(" + this.x + "px, " + this.y + "px)";
        
        Game.container.appendChild(this.elem);
    };
    
    Square.container = [];
    
    Square.prototype.render = function()
    {
        this.x += this.vx;
        this.y += this.vy;
        
        this.bounce();
        
	    this.elem.style[Game.cssPrefix + "Transform"] = "translate(" + this.x + "px, " + this.y + "px)";
    };
    
	Square.prototype.destory = function()
	{
		this.elem.parentNode.removeChild(this.elem);
		for(var i = 0; i < Square.container.length;i++)
		{
			if(Square.container[i] == this)
			{
				Square.container.splice(i, 1);
				this.elem = null;
			}
		}
	};
	
	Square.destory = function()
	{
		while(Square.container.length)
		{
			Square.container[0].destory();
		}
	};
	
    Square.prototype.bounce = function()
    {
		var maxx = 460,maxy = 300,minx = 0,miny = 0;
        if(this.x > maxx){
            this.x = maxx;
            this.vx *= -1;
        }
        else if(this.x < minx){
            this.x = minx;
            this.vx *= -1;
        }
        
        if(this.y < miny){
            this.y = miny;
            this.vy *= -1;
        }
        else if(this.y > maxy){
            this.y = maxy;
            this.vy *= -1;
        }
        
        if(this.x > 215 && this.x < 235 &&( this.y < Game.spaceY ||
            this.y > Game.spaceY + 90) ){
                this.x = this.vx > 0?215:235;
                this.vx *= -1;
        }
		
    };
 
    Square.render = function()
    {
          var i,len = Square.container.length;
          for(i = 0;i < len; i ++)
          {
            Square.container[i].render();    
          }
    };
})();




