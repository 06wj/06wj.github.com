var canvas, 
	context,
	fps = 60,
	drawFps = 60,
	color = '#012b54',
	score = 0,
	speed = 5,
	pianoSpeed = 100,
	pianoMaxSpeed = 20,
	pianoSpeedAll = 100;
	
var	assets = 
{
	player:"img/player2.png",
	bckCircle:'img/bckCircle.png',
	bckStar:'img/bckStar.png',
	bckMouse:'img/bckMouse.png',
	bck:'img/bck.png',
	piano:'img/piano.png',
	num:'img/num.png',
	bckOver:'img/bckOver.jpg',
	gameOver:'img/gameOver.png',
	btnAgain:'img/btnAgain.png',
	btnStart:'img/btnStart.png',
	bckStart:'img/bckStart.jpg'
};

var key = {};

window.onload = function()
{
	loadImages();
	setTimeout(window.scrollTo(0, 0, 1));
	iPhoneControls.init();
	keyControls.init();
	
	createPianos();
};

function loadImages()
{
	var preloaded = 0;
	var count = 0;
	for(var asset in assets)
	{
		count++;
		var img = new Image();
		img.onload = function()
		{
			preloaded++;
			if(preloaded == count)
			{
				init();
			}
		}
		img.src = assets[asset];
		assets[asset] = img;
	}
}

function init()
{
    if(isAppleMobile())
	{
		fps = 100;
		speed = 15;
		pianoMaxSpeed = 5;
		pianoSpeedAll = 30;
		//document.getElementById('canvas').setAttribute('style','width:100%;height:100%');
		//document.getElementById('btn').setAttribute('style','width:100%;height:100%');
	}
	
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	btnStart.draw(2);
	gameStart.init();
	player.mc.initCache();
	gameStart.num.initCache();
	
	Piano.prototype.cache = (function()
	{
		var cache = [];
		for(var i = 0; i < 12; i ++)
		{
			cache[i] = document.createElement('canvas');
			cache[i].width = this.width;
			cache[i].height = this.height;
			cache[i].getContext('2d').drawImage(assets['piano'], i * 140, 0, 140, 130, 0, 0, 140, 130);
		}
		return cache;
	})();
		
	setInterval('updateAll()', 1000/fps);
	setInterval('drawAll()', 1000/drawFps);
}

function trace(obj)
{
	console.log(obj);
}


var iPhoneControls = 
{
	init : function()
	{
		this.onEvent("touchstart", this.onTouchStart);
		this.onEvent("touchmove", this.onTouchMove);
		this.onEvent("touchend", this.onTouchEnd);

		this.onEvent("gesturechanged", this.noHandle);
		this.onEvent("mousedown", this.noHandle );
		this.onEvent("mousemove", this.noHandle );
		this.onEvent("mouseup", this.noHandle );
	},
	
	onEvent : function(event, handler) 
	{
		document.body.addEventListener(event, handler, false);
	},
	
	onTouchStart : function( event )
	{
		event.preventDefault();

		var touches = event.changedTouches;
		for(var i = 0; i < touches.length; i++ )
		{
			var touch = touches[ i ];
			if(touch.pageX > 230) key[39] = true;
			else key[37] = true;
		}
	},
	
	onTouchMove : function(event) 
	{
		event.preventDefault();
		var touches = event.changedTouches;
		for(var i = 0; i < touches.length; i++)
		{
			var touch = touches[i];
		}
	},
	onTouchEnd : function(event) 
	{
		event.preventDefault();
		var touches = event.changedTouches;
		var touch = touches[0];
		if(touch.pageX > 230) key[39] = false;
		else key[37] = false;
		
	}
};


var keyControls = {
	init : function()
	{
		document.addEventListener("keydown", this.onKeyDown, false);
		document.addEventListener("keyup", this.onKeyUp, false);
	},
	onKeyDown : function(e)
	{ 
		key[e.keyCode] = true;
	},
	onKeyUp : function(e)
	{ 
		key[e.keyCode] = false;
	}	
};



function isAppleMobile() {
    return (navigator.platform.indexOf('iPad') != -1);
};









