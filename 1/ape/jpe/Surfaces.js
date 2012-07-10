JPE.declare("Surfaces", {

	superclass: JPE.Group,

	constructor: function(){

		JPE.Surfaces.superclass.prototype.constructor.apply(this);
		
		var RectangleParticle = JPE.RectangleParticle;
		
		var w = 650,
			h = 480,
			sw = 20,
			i;

		this.collideInternal = true;
		
		var wallUp = new RectangleParticle(w / 2, 0, w + sw * 2, sw, 0, true),
			wallDown = new RectangleParticle(w / 2, h, w +  sw * 2, sw, 0, true),
			wallLeft = new RectangleParticle(0, h / 2, sw, h +  sw * 2, 0, true),
			wallRight = new RectangleParticle(w, h / 2, sw, h +  sw * 2, 0, true);
			
		
		var walls = [];
		
		walls.push(wallUp);
		walls.push(wallDown);
		walls.push(wallLeft);
		walls.push(wallRight);
		
		wallRight.friction = .5
		
		for (i = 0; i < walls.length; i ++ )
		{
			this.addParticle(walls[i]);	
			walls[i].setStyle(0, 0, 0, 0x6699ff);
		}
	}
});