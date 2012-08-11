var xoffer = 30;
var pnum = 0;
var colors = [];
var myTool = {
	random:function(j, b, isInt)
	{
		var num = Math.random()*(b - j) + j;
		if(!isInt) return num;
		else return(parseInt(num));
	},
	randomColor: function(alpha)
	{
		if(!alpha) alpha = 0;
		var r = this.random(0, 255, true);
		var robot = this.random(0, 255, true);
		var b = this.random(0, 255, true);
		
		return('rgba(' + r + ',' + robot + ',' + b + ',' + alpha + ')');
	}
};

(function(){
	var color = myTool.randomColor(1),i;
	for(i = 0;i < 768; i++)
	{
		if(i%64 == 63) color = myTool.randomColor(1);
		colors[i] = color;
	}
})()

function initBox()
{
	var i,j;
	
	var w = 15;
	var h = 15;
	
	jc.start("myCanvas");
	for(i = 0;i < 768; i ++)
	{
		if(o[0][parseInt(i/32)] & Math.pow(2, i%32 - 1)) 
			jc.rect({x:parseInt(i/32) * w + 50, y:i%32*h, width:w, height:h, color:colors[i], fill:true}).id("box" + i);
	}
	jc.start("myCanvas");
	
}

function initRobot()
{
		jc.start("myCanvas", true);
		var d = o[0];
		for (var i = 0, b = 0; i < d.length; i++) 
		{
			for (var j = (32); j > 0; j--) 
			{
				var e = Math.pow(2, j - 1);
				if(d[i] & e)
				{
					var cTop = (20 * i);
					var cLeft = (20 * ( - j));
					
					jc("#box"+(i * 32 + j)).animate({x:cLeft - xoffer + 1000,y:cTop - 30,width:20,height:20,color:colors[i * 32 + j]},pnum*5 + 150,{type:'in', fn:'circ'});
					pnum ++;
					
				}	
			}
		}
}

function draw(d,isLast) 
{
	if(!isLast) 
	{
		jc.clear();
		jc.start("myCanvas");
		for (var i = 0, b = 0; i < d.length; i++) 
		{
			for (var j = (32); j > 0; j--) 
			{
				var e = Math.pow(2, j - 1);
				if(d[i] & e)
				{
					var cTop = (20 * i);
					var cLeft = (20 * ( - j));
					pnum = 0;
					jc.rect({x:cLeft - xoffer + 1000,y:cTop - 30,width:21,height:21,color:colors[i * 32 + j],fill:true});
				}
			}
		}
		jc.start("myCanvas");
	}
	else
	{
		pnum = 0;
		jc.clear();
		jc.start("myCanvas", true);
		for (var i = 0, b = 0; i < d.length; i++) 
		{
			for (var j = (32); j > 0; j--) 
			{
				var e = Math.pow(2, j - 1);
				if(d[i] & e)
				{
					var cTop = (20 * i);
					var cLeft = (20 * ( - j));
					
					jc.rect({x:cLeft - xoffer + 1000,y:cTop - 30,width:19,height:19,color:colors[i * 32 + j], fill:true})
					.animate({x:parseInt(pnum/10) * 30+ 50,y: pnum % 10 * 30,width:30,height:30,color:myTool.randomColor(1), fill:false},pnum*10 + 30,{type:'out', fn:'bounce'});
					console.log("x = "+ parseInt(pnum/20) + "y = " + pnum % 20 * 30 );
					pnum ++;	
				}
			}
		}
	}
}

var move = function(x)
{
	xoffer = x;
}
var e = [
        [-1700, function () {
            initRobot();
        }],
		[1600, function () {
            draw(o[1]);
            move(30)
        }],
        [1700, function () {
            draw(o[2]);
            move(40)
        }],
        [1800, function () {
            draw(o[3]);
            move(50)
        }],
        [1900, function () {
            draw(o[4]);
            move(60)
        }],
        [2000, function () {
            draw(o[5]);
            move(70)
        }],
        [2100, function () {
            draw(o[6]);
            move(80)
        }],
        [2200, function () {
            draw(o[7]);
            move(90)
        }],
        [2300, function () {
            draw(o[8]);
            move(100)
        }],
        [2400, function () {
            draw(o[9]);
            move(120);
        }],
        [2800, function () {
            draw(o[10]);
            move(130)
        }],
        [2900, function () {
            draw(o[11]);
            move(140)
        }],
        [3000, function () {
            draw(o[12]);
            move(150)
        }],
        [3100, function () {
            draw(o[13]);
            move(160)
        }],
        [3200, function () {
            draw(o[14]);
            move(170)
        }],
        [3300, function () {
            draw(o[15]);
            move(180)
        }],
        [3400, function () {
            draw(o[16]);
            move(190)
        }],
        [3500, function () {
            draw(o[17]);
            move(200);
        }],
        [3900, function () {
            draw(o[18]);
            move(180)
        }],
        [3900, function () {
            draw(o[19])
        }],
        [4000, function () {
            draw(o[20])
        }],
        [4100, function () {
            draw(o[21])
        }],
        [4200, function () {
            draw(o[22])
        }],
		[4700, function () {
			draw(o[22],true)
        }]
    ];
    
	
	
for (var i = 0; i < e.length; i++) {
	setTimeout(e[i][1], e[i][0] + 2700)
}
	
function main()
{
	initBox();
}
	
	
	
	
	
	

