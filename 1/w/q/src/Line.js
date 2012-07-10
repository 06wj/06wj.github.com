(function(){
	var lines = BallGame.lines = [];

	function Line(p1, p2){
		this.p1 = p1;
		this.p2 = p2;
	}
	var d = 1;
	var m = 2;
	var hole = [
	//[8.7, 34.2, 27.1, 52.7],
	[27.1, 52.7 - m, 27.1, 383.5 + m],
	//[27.1, 383.5, 8.7, 402],
	
	//[34.2, 427.4, 52.4, 408.9],
	[52.4 - m, 408.9, 397.1 + m, 408.9],
	//[397.1, 408.9, 407.2, 429.7],
	
	//[437.9, 429.7, 448, 408.9],
	[448 - m, 408.9, 793 + m, 408.9],
	//[793, 408.9, 811.4, 427.5],
	
	//[837, 402.3, 818.5, 383.6],
	[818.5, 383.6 + m, 818.5, 52.9 -m],
	//[818.5, 52.9, 837, 34.4],
	
	//[811.6, 9.1, 793.1, 27.1],
	[793.1 + m, 27.5, 447.9 - m, 27.5],
	//[447.9, 27.5, 437.9, 6.6],
	
	//[407.3, 6.6, 397.1, 27.5],
	[397.1 + m, 27.5, 52.5 - m, 27.5]
	//[52.5, 27.5, 34.1, 9],
	
	];

	BallGame.holePoint = [
		[26, 25],
		[421, 17],
		[817, 23],
		[820, 407],
		[422, 416],
		[26, 408]
	];

	function createLines()
	{
		var i,j,l,line;
		for(i = 0, l = hole.length; i < l;i++ ){
			var h = hole[i];
			line = new Line(new Vector(h[0] + BallGame.offset.x, h[1] + BallGame.offset.y), new Vector(h[2] + + BallGame.offset.x, h[3] + + BallGame.offset.y));
			lines[i] = line;
		}
	}

	createLines();

	
	

})();