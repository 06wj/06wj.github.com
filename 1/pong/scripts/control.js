(function(){

    window.onmousemove = function(e)
    {
        Game.spaceY = e.clientY - Game.offsetY - 60; 
       if(Game.spaceY < 0)
       {
            Game.spaceY = 0;    
       }
       else if(Game.spaceY > 220)
       {
            Game.spaceY = 220;    
       }
    }
    
    document.body.ontouchmove = function(e)
    {
		    e.preventDefault();
        var yy = e.changedTouches[0].clientY;
		    Game.spaceY =yy - Game.offsetY - 60; 
        if(Game.spaceY < 0)
        {
            Game.spaceY = 0;    
        }
        else if(Game.spaceY > 220)
        {
             Game.spaceY = 220;    
        }   
    };

    document.body.ontouchstart = function(e)
    {
       e.preventDefault();
    };
	
})();