(function(){

var ns = Q.use("BallGame");
var r = ns.r = 14;
//var width = window.innerWidth, height = window.innerHeight;
var width = 960, height =600;
var fps = 60;
var params = ns.params = Quark.getUrlParams();
var mouseR = ns.mouseR = params.r||Q.supportTouch?90:0;
var stage = ns.stage;
var bitmaps = ns.bitmaps = {};
var images = ns.images = {};
var offset = ns.offset = {x:55, y:70};
ns.canShot = true;
var timer;

var res = [
	{id:"table", src:"res/table.jpg"},
	{id:"cue", src:"res/cue.png"},
	{id:"light", src:"res/light.png"},
	{id:"ballRoad", src:"res/ballRoad.png"},
	{id:"player-txt", src:"res/player-txt.png"},
	{id:"ball1", src:"res/ball1.png"},
	{id:"ball9", src:"res/ball9.png"},
	{id:"shot-txt", src:"res/shot-txt.png"},
	{id:"num", src:"res/number.png"},
	{id:"win", src:"res/win.png"},
	{id:"lose", src:"res/lose.png"},
	{id:"loading", src:"res/loading.gif"},
	{id:"num1", src:"res/num.png"}
];

function loadImage(res){
	var loader = new Quark.ImageLoader();
	loader.addEventListener("complete", function(e){
		e.target.removeAllEventListeners();
		
		for(var i in e.images)
		{
			images[i] = e.images[i].image;
		}

		init();
	});

	loader.load(res);	
}

function createBitmaps(){
	for(var i in images)
	{
		bitmaps[i] = new Quark.Bitmap({image:images[i], x:ns.offset.x, y:ns.offset.y, eventEnabled:false});
	}
}

window.onload = loadImage(res);

function init(){
	createBitmaps();
	initStage();
	initFps();
	ns.ui.init();
	initBalls();
	ns.initEvent();
	ns.initCue(); 
	ns.initLine();
	ns.initShotTxt();
	ns.initScore();
	ns.initWin();
	ns.initLose();

	ns.loop = ns.shoot;

	stage.update = function()
	{
		ns.frames++;
		ns.loop();
	}
	
}

ns.shoot = function()
{
	var ang = ns.line.rotation*Math.PI/180;
	ns.point.x = ns.mouse.x - mouseR * Math.cos(ang);
	ns.point.y = ns.mouse.y - mouseR * Math.sin(ang);

	if(ns.isDown)
	{
		ns.power+=ns.powerV;
		if(ns.power > 27 || ns.power < 1) 
		{
			ns.powerV *= -1;
		}
	}
}

function initStage(){
	var container = Quark.getDOM("container");
	var domContext = new Quark.DOMContext({canvas:container});
	
	canvas = Quark.createDOM("canvas", {width:width, height:height, style:{position:"absolute"}});
	canvasContext = new Quark.CanvasContext({canvas:canvas});
	container.appendChild(canvas);

	stage = ns.stage = new Quark.Stage({container:container, width:width, height:height, context:domContext});
	timer = new Quark.Timer(1000/fps);
	timer.addListener(stage);
	timer.addListener(Q.Tween);
	timer.start();

	stage.addChild(bitmaps["table"]);
	ns.initPlayers();
}

function initBalls(){
	ns.Ball.createBalls();
	
	var point = ns.point = new Quark.Bitmap({image:ns.Ball.images[0], rect:[0, 0, ns.r*2, ns.r*2], regX:ns.r, regY:ns.r});
	stage.addChild(ns.point);
	point.alpha = .3;
	
	stage.step();
	for(var i = 0,len = ns.Ball.balls.length;i < len;i++){
		var ball = ns.Ball.balls[i];
		ball.bitmap.drawable.domDrawable.style["borderRadius"] = r + "px";
		ball.light.drawable.domDrawable.style["borderRadius"] = r + "px";
	}
		
	ns.point.drawable.domDrawable.style["borderRadius"] = ns.r + "px";

	stage.addChild(bitmaps["ballRoad"]);
	stage.addChild(bitmaps["cue"]);
	
	bitmaps["ballRoad"].y = offset.y - 60;
	bitmaps["ballRoad"].x = offset.x + 180;
	ns.xx = bitmaps["ballRoad"].x + bitmaps["ballRoad"].width - r - 6;
}

function initFps(){
	ns.frames = 0, fpsContainer = Quark.getDOM("fps");
	setInterval(function()
	{
		fpsContainer.innerHTML = "FPS:" + ns.frames;
		ns.frames = 0;
	}, 1000);
}


window.shoot = function(x, y){
	BallGame.whiteBall.v.reset(x, y)
	BallGame.loop = BallGame.Ball.update
}

window.print = function(){
	for(var i = 0;i < BallGame.Ball.balls.length;i++){
		var b = BallGame.Ball.balls[i]
		console.log(b.x - offset.x, b.y - offset.y, b.num)
	}

}






})();