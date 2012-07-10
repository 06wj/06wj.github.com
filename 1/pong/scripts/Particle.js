(function(){
	var Particle = Game.Particle = function(x, y, v)
	{
		this.loc = new Vector(x, y);
		this.v = v;
		this.die = false;
		this.time = 0;
	};
	
	Particle.container = [];
	Particle.init = function(id)
	{
		Particle.context = document.getElementById(id).getContext("2d");
	};
	
	Particle.render = function()
	{
		Particle.context.clearRect(0,0,480,320);
		
		var i,len = Particle.container.length;
	    for(i = 0;i < len; i ++)
	    {
		  var p = Particle.container[i];
		  
		  p.render();
		  
		  if(p.die)
		  {
			Particle.container.splice(i, 1);
			i --;
			len = Particle.container.length;
		  }
	    }
	};
	
	Particle.prototype.render = function()
	{
		this.time ++;
		
		this.loc.plus(this.v);
		this.v.y += .01;
		
		Particle.context.fillRect(this.loc.x - 1, this.loc.y - 1, 2, 2)
		
		if(this.time > 50)
		{
			this.die = true;
		}
	};
	
})();










