function Grid(box)
{
	this.numCols = 0; 
	this.numRows = 0;
	this.nodes = [];
	this.endNode = new Node(0, 0);
	this.startNode = new Node(0, 0);
	
	this.init(box);
}


Grid.prototype.setEndNode = function(x, y)
{ 
	this.endNode = this.nodes[x][y];
} 

Grid.prototype.setStartNode = function(x, y)
{ 
	this.startNode = this.nodes[x][y];
} 

Grid.prototype.setWalkable = function(x, y, value)
{ 
	this.nodes[x][y].walkable = value; 
}

Grid.prototype.init = function(box)
{ 	
	this.numRows = box.length; 
	this.numCols = box[0].length;
	
	for(i = 0; i < this.numCols; i++) 
	{ 
		this.nodes[i] = []; 
		
		for(j = 0; j < this.numRows; j++) 
		{ 
			this.nodes[i][j] = new Node(i, j); 
			this.nodes[i][j].walkable = box[j][i]; 
		} 
	} 
}  

Grid.prototype.random = function(x, y)
{
	this.numRows = y; 
	this.numCols = x;
	var i;
	
	for(i = 0; i < x; i++) 
	{ 
		this.nodes[i] = []; 
		
		for(j = 0; j < y; j++) 
		{ 
			this.nodes[i][j] = new Node(i, j); 
		} 
	} 
	
	for(i = 0; i < 100; i++) 
	{ 
		this.setWalkable(Math.floor(Math.random() * x), Math.floor(Math.random() * y), false); 
	} 
	
	this.setWalkable(0, 0, true);
	this.setWalkable(0, 1, true);
	this.setWalkable(1, 0, true);
	this.setWalkable(1, 1, true);
	
	
	for(i = 0; i < x; i++) 
	{ 		
		for(j = 0; j < y; j++) 
		{ 
			this.nodes[i][j].type = this.nodes[i][j].walkable?parseInt(Math.random()*3):parseInt(Math.random()*7);
		} 
	} 
	
	this.draw();
}

Grid.prototype.draw = function()
{
	var myCanvas = document.getElementById("ground");
	var g = myCanvas.getContext("2d");
	var img = document.getElementById("groundImg");
	
	g.clearRect(0, 0, 800, 600);
	
	var grid = this;
	var numCols = grid.numCols;
	var numRows = grid.numRows;
	
	for(i = 0; i < numCols; i++) 
	{ 
		for(j = 0; j < numRows; j++) 
		{ 

			var imgX = grid.nodes[i][j].type * 40;
			
			if(grid.nodes[i][j].walkable)
			{
				g.drawImage(img, imgX, 67, 40, 40, i * 40, j * 40, 40, 40) ;
			}
			else
			{
				g.drawImage(img, imgX, 0, 40, 67, i * 40, j * 40 - 27, 40, 67) ;
			} 
		} 
	}	

}



