var lineImage = new Image();
var minx = 84,
	miny = 110,
	maxx = 873,
	maxy = 489,
	lines = [];
(function(){
		var canvas = Q.createDOM('canvas',{width:1,height:2});
		var context = canvas.getContext('2d');
		context.fillStyle = "#fff";
		context.fillRect(0, 0, 1, 2);
		var url = canvas.toDataURL();
		lineImage.src = url;		
})();

function Line(props)
{
	this.loc = null;
	Q.Bitmap.call(this, props);
	
}
Q.inherit(Line, Q.Bitmap);

Line.prototype.update = function()
{
	if(this.loc){
		this.x = this.loc.p1.x;
		this.y = this.loc.p1.y;
	
		var tx = this.loc.p2.x - this.loc.p1.x;
		var ty = this.loc.p2.y - this.loc.p1.y;
	
		var tlen = tx*tx + ty*ty;
		this.scaleX = Math.sqrt(tlen);
		this.rotation = Math.atan2(ty,tx)/Math.PI*180;
	}
};

var hole = [
	[8.7, 34.2, 27.1, 52.7],
	[27.1, 52.7, 27.1, 383.5],
	[27.1, 383.5, 8.7, 402],
	//[8.7, 402, 34.2, 427.4],
	[34.2, 427.4, 52.4, 408.9],
	[52.4, 408.9, 397.1, 408.9],
	[397.1, 408.9, 407.2, 429.7],
	//[407.2, 429.7, 422.5, 437.3],
	//[422.5, 437.3, 437.9, 429.7],
	[437.9, 429.7, 448, 408.9],
	[448, 408.9, 793, 408.9],
	[793, 408.9, 811.4, 427.5],
	//[811.4, 427.5, 837, 402.3],
	[837, 402.3, 818.5, 383.6],
	[818.5, 383.6, 818.5, 52.9],
	[818.5, 52.9, 837, 34.4],
	//[837, 34.4, 811.6, 9.1],
	[811.6, 9.1, 793.1, 27.1],
	[793.1, 27.5, 447.9, 27.5],
	[447.9, 27.5, 437.9, 6.6],
	//[437.9, 6.6, 422.5, 0],
	//[422.5, 0, 407.3, 6.6],
	[407.3, 6.6, 397.1, 27.5],
	[397.1, 27.5, 52.5, 27.5],
	[52.5, 27.5, 34.1, 9],
	//[34.1, 9, 8.7, 34.2]


	//[100, 200, 300, 360]
];

function createLines()
{
	var i,j,l,line,pos;
	for(i = 0, l = hole.length; i < l;i++ ){
		var h = hole[i];
		pos = {p1:new Vector(h[0], h[1]), p2:new Vector(h[2], h[3])};
		line = new Line({image:lineImage,regX:0,regY:0,loc:pos});
		stage.addChild(line);
		lines.push(pos);
	}
}