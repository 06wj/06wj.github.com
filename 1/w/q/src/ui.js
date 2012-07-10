(function(){
	var ns = Q.use("BallGame");
	
	var ui = ns.ui = {};
	
	ui.init = function()
	{
		var stage = ns.stage;
		var images = ns.images;
		var bitmaps = ns.bitmaps;

		var x = ns.offset.x;
		var y = ns.offset.y;
		var boardPlayer1 = ns.boardPlayer1 = new Quark.Bitmap({image:images["player-txt"], rect:[0, 0, 175, 28], eventEnabled:false});
		var boardPlayer2 = ns.boardPlayer2 = new Quark.Bitmap({image:images["player-txt"], rect:[175, 0, 175, 28], eventEnabled:false});
		
		ns.playerPos = [x + 120, x + 680];
		
		boardPlayer1.scaleX = .6;
		boardPlayer1.scaleY = .6;

		boardPlayer1.x = x + 20;
		boardPlayer1.y = y - 50;

		boardPlayer2.scaleX = .6;
		boardPlayer2.scaleY = .6;

		boardPlayer2.x = x + 723;
		boardPlayer2.y = y - 50;
		boardPlayer2.alpha = .2;

		stage.addChild(boardPlayer1);
		stage.addChild(boardPlayer2);

		ns.bitmaps["ball1"].y = y - 50;
		ns.bitmaps["ball9"].y = y - 50;
		
	};

	ns.initPlayerType = function(type){
		ns.stage.addChild(ns.bitmaps["ball1"]);
		ns.stage.addChild(ns.bitmaps["ball9"]);
		
		var player = ns.player;

		if(type == 1){
			ns.bitmaps["ball1"].x = ns.playerPos[player.id-1];
			ns.bitmaps["ball9"].x = ns.playerPos[player.next.id-1];

			ns.player.type = type;
			ns.player.ball = ns.bitmaps["ball1"];
			ns.player.next.ball = ns.bitmaps["ball9"];
			ns.player.next.ball.alpha = .3;
			ns.player.next.type = -1;
		}
		else{
			ns.bitmaps["ball9"].x = ns.playerPos[player.id-1];
			ns.bitmaps["ball1"].x = ns.playerPos[player.next.id-1];

			ns.player.ball = ns.bitmaps["ball9"];
			ns.player.next.ball = ns.bitmaps["ball1"];
			ns.player.next.ball.alpha = .3;
			ns.player.type = type;
			ns.player.next.type = 1;
		}
	};

	ns.initScore = function(num){
		ns.Player.score = num;
	}

	ns.changePlayer = function()
	{	
		if(ns.player == ns.player1){
			ns.boardPlayer1.alpha = .2;
			ns.score1.alpha = .2;
			ns.boardPlayer2.alpha = 1;
			ns.score2.alpha = 1;
			ns.player = ns.player2;
		}
		else{
			ns.boardPlayer2.alpha = .2;
			ns.score2.alpha = .2;
			ns.boardPlayer1.alpha = 1;
			ns.score1.alpha = 1;
			ns.player = ns.player1;
		}
		ns.player.ball.alpha = 1;
		ns.player.next.ball.alpha = .3;
	}

	ns.initShotTxt = function(){
		var shotTxt = ns.shotTxt = ns.bitmaps["shot-txt"];
		ns.stage.addChild(shotTxt);
		
		shotTxt.x = ns.offset.x
		shotTxt.y = ns.offset.y + 100
		shotTxt.alpha = 0;	
	}

	ns.setGood = function(){
		var shotTxt = ns.shotTxt;
		shotTxt.setRect([0, 0, 200, 60]);
		Q.Tween.to(shotTxt, {x:ns.offset.x + 330, alpha:1}, {time:300, ease:Q.Easing.Quadratic.EaseIn, onComplete:function(){
		Q.Tween.to(shotTxt, {alpha:0, x:ns.offset.x + 800}, {time:300, delay:500, onComplete:function(){
			shotTxt.x = 0;
			startShoot();
		}});
		}})
	};
	
	ns.setBad = function(){
		var shotTxt = ns.shotTxt;
		shotTxt.setRect([200, 0, 150, 60]);
		Q.Tween.to(shotTxt, {x:ns.offset.x + 350, alpha:1}, {time:300, ease:Q.Easing.Quadratic.EaseIn, onComplete:function(){
			Q.Tween.to(shotTxt, {alpha:0,  x:ns.offset.x + 800}, {time:300, delay:500, onComplete:function(){
			
			shotTxt.x = 0;
			ns.changePlayer();
			startShoot();
		}});
		}});
	}

	var startShoot = ns.startShoot = function()
	{
		ns.canShot = true;
		ns.loop = ns.shoot;
		ns.cue.visible = true;
		ns.line.visible = true;
		ns.point.visible = true;
	}

	ns.initScore = function()
	{
		ns.score1 = new ns.Num({max:2, x:ns.offset.x + 40, y:ns.offset.y - 30});
		ns.score2 = new ns.Num({max:2, x:ns.offset.x + 730, y:ns.offset.y - 30});
		
		ns.score2.alpha = .2;	

		ns.stage.addChild(ns.score1);	
		ns.stage.addChild(ns.score2);
	};

	ns.initWin = function()
	{
		ns.winTxt = new Q.Bitmap({image:ns.images["win"], x:0, alpha:0, y:ns.offset.y + 150, eventEnabled:false});	
		ns.stage.addChild(ns.winTxt);
	};

	ns.initLose = function()
	{
		ns.loseTxt = new Q.Bitmap({image:ns.images["lose"], x:0, alpha:0, y:ns.offset.y + 150, eventEnabled:false});	
		ns.stage.addChild(ns.loseTxt);
	};

	ns.setWin = function()
	{
		Q.Tween.to(ns.winTxt, {x:ns.offset.x + 330, alpha:1}, {time:350, ease:Q.Easing.Quadratic.EaseIn, onComplete:function(){
			ns.cue.visible = false;
			ns.line.visible = false;
			ns.point.visible = false;
			ns.loop = function(){};
		}});
	};

	ns.setLose = function()
	{
		Q.Tween.to(ns.loseTxt, {x:ns.offset.x + 290, alpha:1}, {time:350, ease:Q.Easing.Quadratic.EaseIn, onComplete:function(){
			ns.cue.visible = false;
			ns.line.visible = false;
			ns.point.visible = false;																																																																																																											
			ns.loop = function(){};
			
			for(var i = 0,len = ns.Ball.balls.length;i < len;i++)
			{
				setTimeout(function(i){ns.Ball.balls[i].update = ns.Ball.prototype.inHole}, i*2000, i);
			}
		}});
	};

	var hitNum = 0;
	var hitX = 5;
	window.m = function(){
		var time = 10;
		Q.Tween.to(ns.stage, {x:hitX}, {time:time, onComplete:function(){
			Q.Tween.to(ns.stage, {x:-hitX}, {time:time*2, onComplete:function(){
				Q.Tween.to(ns.stage, {x:0}, {time:time, onComplete:function(){
				hitNum++;
				hitX -= 1;
				if(hitNum < 2){m()}
				else(hitNum = 0)
			}})
			}})
		}})
	};

})();