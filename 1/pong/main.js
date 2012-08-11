(function(){
    
    var Game = window.Game = {};
    detectBrowser(Game);
    Game.cssPrefix = Game.isWebKit ? "webkit" : Game.isMozilla ? "Moz" : Game.isOpera ? "O" : Game.isIE ? "ms" : "";
    
    Game.spaceY = 0;
    Game.speed = 17;
    window.onkeydown = function(e)
    {
        //up
        if(e.keyCode === 38) {
            Game.spaceY -= Game.speed;
        }
        //down
        if(e.keyCode === 40){
            Game.spaceY += Game.speed;
        }
        
        Game.space.style[Game.cssPrefix + "Transform"] = "translate(0px, " + Game.spaceY + "px)";
    };
    
    window.onmousemove = function(e)
    {
        Game.spaceY = e.clientY - Game.offsetY - 60; 
       // console.log(Game.spaceY, Game.offsetY,e.clientY);
       if(Game.spaceY < 0)
       {
            Game.spaceY = 0;    
       }
       else if(Game.spaceY > 220)
       {
            Game.spaceY = 220;    
       }
        Game.space.style[Game.cssPrefix + "Transform"] = "translate(0px, " + Game.spaceY + "px)";
        
    }
    
    window.ontouchmove = function(e)
    {
        var yy = e.touches[0].clientY;
        Game.spaceY =yy - Game.offsetY - 60; 
        // console.log(Game.spaceY, Game.offsetY,e.clientY);
       
        if(Game.spaceY < 0)
        {
             Game.spaceY = 0;    
        }
        else if(Game.spaceY > 220)
        {
             Game.spaceY = 220;    
        }
        Game.space.style[Game.cssPrefix + "Transform"] = "translate(0px, " + Game.spaceY + "px)";    
    }
    
    var Square = Game.Square = function(x, y, color)
    {
        this.elem = document.createElement("div");
        this.elem.setAttribute("class", "square " + color);
        this.color = color;
        
        this.x = x;
        this.y = y;
        
        
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
    
    Square.prototype.bounce = function()
    {
        if(this.x > 470){
            this.x = 470;
            this.vx *= -1;
        }
        else if(this.x < 0){
            this.x = 0;
            this.vx *= -1;
        }
        
        if(this.y < 0){
            this.y = 0;
            this.vy *= -1;
        }
        else if(this.y > 310){
            this.y = 310;
            this.vy *= -1;
        }
        
        if(this.x > 225 && this.x < 245 &&( this.y < Game.spaceY ||
            this.y > Game.spaceY + 90) ){
                this.x = this.vx > 0?225:245;
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
    
    Game.init = function(container, fps)
    {
        Game.container = document.getElementById(container);
        Game.space = document.getElementById("space");
        Game.offsetX = getElementOffset(Game.container).left;
        Game.offsetY = getElementOffset(Game.container).top;
        
        Game.squares = [];
        Game.addSquares(16);
        
        setInterval(Game.loop, 1000/fps);
    };
    
    Game.loop = function()
    {
       Square.render();
    };
    
    Game.addSquares = function(n)
    {
        var i,color;
        for(i = 0;i < n;i++)
        {
            color = Math.random()>.5?"red":"blue";
            Square.container[i] = new Square(Math.random()*470,Math.random()*310,color);    
        }
    }; 
    
    window.onload = function()
    {
      Game.init("game", 60);
    };
    
    function detectBrowser(ns)
    {
        var ua = ns.ua = navigator.userAgent;
        ns.isWebKit = (/webkit/i).test(ua);
        ns.isMozilla = (/mozilla/i).test(ua);	
        ns.isIE = (/msie/i).test(ua);
        ns.isOpera = (/opera/i).test(ua);
    }
    function getElementOffset(elem)
    {
        var left = elem.offsetLeft, top = elem.offsetTop;
    	while((elem = elem.offsetParent) && elem != document.body && elem != document)
    	{
    		left += elem.offsetLeft;
    		top += elem.offsetTop;
    	}
    	return {left:left, top:top};
    };	
})();