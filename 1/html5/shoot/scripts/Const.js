var K_UP = 38;
var K_DOWN = 40;
var K_RIGHT = 39;
var K_LEFT = 37;

var K_SPACE = 32;

var K_A = 65;
var K_B = 66;
var K_C = 67;
var K_D = 68;
var K_E = 69;
var K_F = 70;
var K_G = 71;
var K_H = 72;
var K_I = 73;
var K_J = 74;
var K_K = 75;
var K_L = 76;
var K_M = 77;
var K_N = 78;
var K_O = 79;
var K_P = 80;
var K_Q = 81;
var K_R = 82;
var K_S = 83;
var K_T = 84;
var K_U = 85;
var K_V = 86;
var K_W = 87;
var K_X = 88;
var K_Y = 89;
var K_Z = 90;

var tool =
{
	random :function(x, y, isInt)
	{
		var temp = Math.random() * (y - x) + x;
		
		if(isInt)
		{
			return parseInt(temp);
		}
		else
		{
			return temp;
		}
	},
	
	hitTestObject : function(objB, objA)
	{
		
		var minx = objB.loc.x > objA.loc.x ? objB.loc.x :objA.loc.x;
		var maxx = objB.loc.x + objB.width < objA.loc.x + objA.width ? objB.loc.x + objB.width : objA.loc.x + objA.width ;
		var miny = objB.loc.y > objA.loc.y ? objB.loc.y : objA.loc.y;
		var maxy = objB.loc.y + objB.width < objA.loc.y + objA.width ? objB.loc.y + objB.width : objA.loc.y + objA.width;
		
		if (minx <= maxx && miny <= maxy) {return true;}
		else {return false;}
	}	
};

