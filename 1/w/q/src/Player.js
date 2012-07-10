(function(){
	var ns = Q.use("BallGame");
	
	var Player = ns.Player = function(id){
		this.id = id;
		this.type = null;
		this.score = 0;
		this.num = 0;
		this.ball = {};	
	};

	Player.prototype.initType = function(type){
		this.type = type;	
	};

	Player.prototype.init = function(){
		this.score = 0;
		this.num = 0;
	}

	Player.prototype.shot = function(v, angle){
		var balls = ns.Ball.balls;
		balls[0].v = v;
		balls[0].v.setAngle(angle);
	}

	ns.initPlayers = function(){
		var player1 = ns.player1 = new Player(1);
		var player2 = ns.player2 = new Player(2);

		player1.addScore = function(num)
		{
			this.score += num;
			ns.score1.setValue(this.score); 
		}

		player2.addScore = function(num)
		{
			this.score += num;
			ns.score2.setValue(this.score); 
		}

		player1.next = player2;
		player2.next = player1;

		ns.player = player1;
	}


})();