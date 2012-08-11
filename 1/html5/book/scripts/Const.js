var UP = 1;
var DOWN = 2;
var LEFT = 4;
var RIGHT = 8;


var K_UP = 38;
var K_DOWN = 40;
var K_RIGHT = 39;
var K_LEFT = 37;

var K_SPACE = 32;
var K_TAB = 9;
var K_ENTER = 13;
var K_CTRL = 17;
var K_ALT = 18;

var K_0 = 48;
var K_1 = 49;
var K_2 = 50;
var K_3 = 51;
var K_4 = 52;
var K_5 = 53;
var K_6 = 54;
var K_7 = 55;
var K_8 = 56;
var K_9 = 57;
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
		var widthA = objA.hitWidth/2; 
		var widthB = objB.hitWidth/2;
 
		var minx = Math.max(objB.loc.x - widthB, objA.loc.x - widthA);
		var maxx = Math.min(objB.loc.x + widthB, objA.loc.x + widthA);
		var miny = Math.max(objB.loc.y - widthB, objA.loc.y - widthA);
		var maxy = Math.min(objB.loc.y + widthB, objA.loc.y + widthA );
		
		if (minx <= maxx && miny <= maxy) {return true;}
		else {return false;}
	},
	
	hitTestGround:function(obj)
	{
		var halfWidth = obj.hitWidth/2;
		
		if(obj.loc.x > 600 || obj.loc.y > 600 || obj.loc.x < -100 || obj.loc.y < -100) 
		{
			obj.isDie = true;
			return;
		}
		
		if(obj.loc.x + halfWidth > 500 || obj.loc.x - halfWidth < 0) 
		{
			obj.loc.x -= obj.v.x;
			obj.v.x *= -1;
		}
		if(obj.loc.y + halfWidth > 500 || obj.loc.y - halfWidth < 0) 
		{
			obj.loc.y -= obj.v.y;
			obj.v.y *= -1;
		}	
	}
}



