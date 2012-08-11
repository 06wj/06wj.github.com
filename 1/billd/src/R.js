(function(){

var ns = Q.use("billd");
var R = ns.R = {};

R.sources = 
[
	{id:"billd", size:31, src:"images/billd.gif?1"},
	{id:"bck", size:58, src:"images/groundBack1.jpg?1"},
	{id:"hitGround", size:51, src:"images/hitGround.png?1"}
];

R.init = function(images)
{
	this.images = images;
	this.initResources();
	this.initHitData();
};

R.initResources = function()
{
	this.hitGround = {image:this.getImage("hitGround"),rect:[0, 0, 6812, 545], x:-3406, eventEnabled:false};
	this.bck = {image:this.getImage("bck"), rect:[0, 0,  5782, 545], x:-2891, eventEnabled:false};
	this.billd = {image:this.getImage("billd"), interval:50, y:333, x:100, regX:60, regY:120, eventEnabled:false};
}

R.getImage = function(id)
{
	return this.images[id].image;
};

R.initHitData = function()
{
	var c = Q.createDOM("canvas", {width:3406, height:545});
	c.getContext("2d").drawImage(this.getImage("hitGround"), 0, 0);
	var data = c.getContext("2d").getImageData(0, 0, 3406, 545).data;
	var hitY = ns.hitY = [];
	for(var i = 0;i < 3406; i++)
	{
		for(var j = 0;j < 545; j++)
		{
			if(data[(j * 3406 + i) * 4 + 3] > .1)
			{
				hitY.push(j);
				break;
			}
		}
	}
};

})();