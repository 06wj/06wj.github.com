(function(){
	var Game = window.Game = {};
	detectBrowser(Game);
	Game.cssPrefix = Game.isWebKit ? "webkit" : Game.isMozilla ? "Moz" : Game.isOpera ? "O" : Game.isIE ? "ms" : "";
	if(Game.isMobile) alert("mobile");
    
	Game.getElementOffset = function(elem)
    {
        var left = elem.offsetLeft, top = elem.offsetTop;
    	while((elem = elem.offsetParent) && elem != document.body && elem != document)
    	{
    		left += elem.offsetLeft;
    		top += elem.offsetTop;
    	}
    	return {left:left, top:top};
    };
	
	Game.id = 1;
	Game.width = 460;
    Game.height = 300;
    
	function detectBrowser(ns)
    {
        var ua = ns.ua = navigator.userAgent;
        ns.isWebKit = (/webkit/i).test(ua);
        ns.isMozilla = (/mozilla/i).test(ua);    
        ns.isIE = (/msie/i).test(ua);
        ns.isOpera = (/opera/i).test(ua);
        ns.isMobile = (/mobile/i).test(ua);
    }
})();