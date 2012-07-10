var width = 40;

function Astar()
{
	this.open = []; 
	this.closed = []; 
	this.grid = null; 
	this.endNode = null; 
	this.startNode = null; 
	this.path = []; 
	this.straightCost = 1.0; 
	this.diagCost = Math.sqrt(2); 
}

Astar.prototype.findPath = function(grid)
{
	this.grid = grid;

	this.open = []; 
	this.closed = []; 
	this.startNode = grid.startNode; 
	this.endNode = grid.endNode; 
	this.startNode.g = 0; 
	this.startNode.h = this.heuristic(this.startNode); 
	this.startNode.f = this.startNode.g + this.startNode.h; 
	return this.search(); 
}

Astar.prototype.search = function()
{
	var i, j;
	var node = this.startNode;
	while(node != this.endNode)
	{
		var startX = Math.max(0, node.x - 1);
		var endX = Math.min(this.grid.numCols - 1, node.x + 1);
		var startY = Math.max(0, node.y - 1);
		var endY = Math.min(this.grid.numRows - 1, node.y + 1);
		
		for(i = startX; i <= endX; i++)
		{
			for(j = startY; j <= endY; j++)
			{
				var test = this.grid.nodes[i][j];
				if(test == node || 
				   !test.walkable ||
				   !this.grid.nodes[node.x][test.y].walkable ||
				   !this.grid.nodes[test.x][node.y].walkable)
				{
					continue;
				}
				
				var cost = this.straightCost;
				if(!((node.x == test.x) || (node.y == test.y)))
				{
					cost = this.diagCost;
				}
				var g = node.g + cost * test.costMultiplier;
				var h = this.heuristic(test);
				var f = g + h;
				
				if(this.isOpen(test) || this.isClosed(test))
				{
					if(test.f > f)
					{
						test.f = f;
						test.g = g;
						test.h = h;
						test.parent = node;
					}
				}
				else
				{
					test.f = f;
					test.g = g;
					test.h = h;
					test.parent = node;
					this.open.push(test);
				}
			}
		}
		
		this.closed.push(node);
		if(this.open.length == 0)
		{
			alert("没有路径可通过");
			return false
		}
		this.open.sort(compareF);
		node = this.open.shift();
	}
	this.buildPath();
	this.drawPath();
	return true;
}

function compareF(a, b)
{
	return a.f - b.f;
}

Astar.prototype.buildPath = function()
{ 
	this.path = new Array(); 
	var node = this.endNode; 
	this.path.push(node); 
	
	while(node != this.startNode) 
	{ 
		node = node.parent;
		this.path.unshift(node); 
	} 
} 

Astar.prototype.isOpen = function(node)
{
	for(var i = 0; i < this.open.length; i++)
	{
		if(this.open[i] == node)
		{
			return true;
		}
	}
	return false;
}

Astar.prototype.isClosed = function(node)
{
	for(var i = 0; i < this.closed.length; i++)
	{
		if(this.closed[i] == node)
		{
			return true;
		}
	}
	return false;
}
		

Astar.prototype.heuristic = function(node)
{
	var dx = node.x - this.endNode.x; 
	var dy = node.y - this.endNode.y; 
	return Math.sqrt(dx * dx + dy * dy) * this.straightCost; 
}



Astar.prototype.drawPath = function()
{
	var myCanvas = document.getElementById("main");
	var g = myCanvas.getContext("2d");
	
	var path = this.path;
	var len = path.length;
	
	g.clearRect(0, 0, 800, 600);
	g.save();  
	
	
	g.shadowBlur= 8; 
	g.shadowColor='#f00';
	g.shadowOffsetX = 6; 
	g.shadowOffsetY= 6; 
	
	
	g.beginPath(); 
	g.strokeStyle="#f96"; 
	g.lineWidth = 2;
	g.moveTo(path[0].x * width + 20, path[0].y * width + 20);
	for(i = 1; i < len ; i++) 
	{ 
		g.lineTo(path[i].x * width + 20, path[i].y * width + 20);
	} 
	g.stroke(); 
	
	g.save();  
	g.beginPath(); 
	g.strokeStyle="#f69"; 
	g.lineWidth = 3;
	g.arc(path[len - 1].x * 40 + 20,  path[len - 1].y * 40 + 20,  5,  0,  2 * Math.PI, true);
	g.stroke(); 
	g.restore(); 
}











