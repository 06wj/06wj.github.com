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



