
(function(){

window.onload = function()
{
	setTimeout(function()
	{
		game.load();
	}, 10);
};

var ns = Q.use("billd");

var game = ns.game = 
{	
	fps: 60,
	frames: 0
};

game.load = function(container)
{	
	if(Q.isIpod || Q.isIphone)
	{
		this.width = 980;
		this.height = 545;
		Q.addMeta({name:"viewport", content:"user-scalable=no"});
	}else
	{		
		Q.addMeta({name:"viewport", content:"user-scalable=no, initial-scale=1.0, minimum-scale=1, maximum-scale=1"});
		this.width = Math.min(1024, window.innerWidth);
		this.height = Math.min(768, window.innerHeight);
	}
	
	//初始化容器设置
	this.container = container || Q.getDOM("container");
	this.container.style.overflow = "hidden";
	this.container.style.width = this.width + "px";
	this.container.style.height = this.height + "px";
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	
	//load info
	var div = Q.createDOM("div", {innerHTML: "正在加载资源中，请稍候...<br>", style:
	{
		id: "loader",
		position: "absolute",
		width: this.width + "px",
		left: "0px",
		top: (this.height >> 1) + "px",
		textAlign: "center",
		color: "#000",
		font: Q.isMobile ?  'bold 16px 黑体' : 'bold 16px 宋体',
		textShadow: "0 2px 2px #111"
	}});
	this.container.appendChild(div);
	this.loader = div;
    
    //hide nav bar
    this.hideNavBar();
    if(Q.supportOrientation)
    {
        window.onorientationchange = function(e)
        {
            game.hideNavBar();
           if(game.stage) game.stage.updatePosition();
        };
    }
	
	//start load image
	var imgLoader = new Q.ImageLoader();
	imgLoader.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
	imgLoader.addEventListener("complete", Q.delegate(this.onLoadComplete, this));
	imgLoader.load(ns.R.sources);
};

game.onLoadLoaded = function(e)
{
	var content = "正在加载资源中，请稍候...<br>(" + Math.round(e.target.getLoadedSize()/e.target.getTotalSize()*100) + "%)";
	this.loader.innerHTML = content;
};

game.onLoadComplete = function(e)
{
	e.target.removeAllEventListeners();
	this.init(e.images);
};

game.init = function(images)
{
	ns.R.init(images);
	this.startup();
};

game.startup = function()
{
	var me = this;
	this.container.removeChild(this.loader);
	this.loader = null;
	
	//手持设备的特殊webkit设置	
	if(Q.isWebKit && !Q.supportTouch)
	{
		document.body.style.webkitTouchCallout = "none";
		document.body.style.webkitUserSelect = "none";
		document.body.style.webkitTextSizeAdjust = "none";
		document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
	}   
	
	this.context = new Q.DOMContext({canvas:this.container});
	
	this.stage = new Q.Stage({width:980, height:545, context:this.context});

	var timer = this.timer = new Q.Timer(1000 / this.fps);
	timer.addListener(this.stage);
	timer.addListener(Q.Tween);
	timer.start();
	
	this.showFPS();

	var scaleX = this.width/980;
	var scaleY = this.height/545;

	this.stage.regX = 490;
	this.stage.x = this.width/2;
	this.stage.scaleX = this.stage.scaleY = Math.min(scaleX, scaleY);
	this.addObjects();
};

game.addObjects = function()
{
	ns.bck = new Q.Bitmap(ns.R.bck);
	this.stage.addChild(ns.bck);
	
	ns.hitGround = new Q.Bitmap(ns.R.hitGround);
	this.stage.addChild(ns.hitGround);

	ns.player = new ns.Billd(ns.R.billd);
	this.stage.addChild(ns.player);

	ns.initEvent();
	this.stage.update = update;	
};

function update(timeInfo)
{
	ns.game.frames++;
	ns.keyEvent();
};

game.showFPS = function()
{
	var me = this, fpsContainer = Quark.getDOM("fps");
	if(fpsContainer)
	{
		setInterval(function()
		{
			fpsContainer.innerHTML = "FPS:" + me.frames;
			me.frames = 0;
		}, 1000);
	}
};

game.hideNavBar = function()
{
    window.scrollTo(0, 1);
};

})();