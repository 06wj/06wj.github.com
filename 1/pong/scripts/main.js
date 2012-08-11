(function(){

	var Square = Game.Square;
	var Particle = Game.Particle;
    var level = 1;

	function init(fps)
    {
        Game.container = document.getElementById("game");
        Game.space = document.getElementById("space");
		Game.offsetX = Game.getElementOffset(Game.container).left;
        Game.offsetY = Game.getElementOffset(Game.container).top;
		
        setInterval(loop, 1000/fps);
    }
    
	function initStage(level)
	{
		addSquares(level * 2);
	}
	
    function loop()
    {
       Game.space.style[Game.cssPrefix + "Transform"] = "translate(0px, " + Game.spaceY + "px)"; 
       Square.render();
    }
    
    function addSquares(n)
    {
        var i,color;
        var half = n/2;
        for(i = 0;i < n;i++)
        {
            color =i < half?"white":"black";
            Square.container[i] = new Square(Math.random()*460,Math.random()*300,color);    
        }
    };
    
    window.onload = function()
    {
      init(60);
	  initStage(6);
	  setTimeout("Game.Square.destory();",3000);
	  setTimeout(function(){addSquares(12)},5000);
    };
})();






