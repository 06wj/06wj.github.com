JPE.declare("Car", {

	superclass: JPE.Group,
	
	
	constructor: function(){

		JPE.Car.superclass.prototype.constructor.apply(this);

		var CircleParticle = JPE.CircleParticle,
			WheelParticle = JPE.WheelParticle,
			SpringConstraint = JPE.SpringConstraint;
		
		this.collideInternal = true;
		
		loc = {
			x:100,
			y:50
		};
		
		var cir1 = new WheelParticle(loc.x, loc.y, 20);
		var cir2 = new WheelParticle(loc.x + 80, loc.y, 20);
		
		var cir3 = new CircleParticle(loc.x + 10, loc.y - 60, 1);
		var cir4 = new CircleParticle(loc.x + 70, loc.y - 60, 1);
		
		var cir5 = new WheelParticle(loc.x + 40, loc.y - 20, 20);
		
		var con12 = new SpringConstraint(cir1, cir2, 1, true, 10, 1);
		var con34 = new SpringConstraint(cir3, cir4, 1, true, 5, 1);
		var con13 = new SpringConstraint(cir1, cir3, 1, true, 5, 1);
		var con24 = new SpringConstraint(cir2, cir4, 1, true, 5, 1);
		var con23 = new SpringConstraint(cir2, cir3,.5);
		var con14 = new SpringConstraint(cir1, cir4,.5);
		
		cir1.setStyle(7, 0x9966ff, .7, 0, .1);
		cir2.setStyle(7, 0x9966ff, .7, 0, .1);
		
		cir3.setStyle(7, 0x9966ff, .7);
		cir4.setStyle(7, 0x9966ff, .7);
		
		cir5.setStyle(3, 0x66ff99, 1, 0, .1);
		
		con12.setStyle(1,0xaa66ff, 1, 0x9966ff, .7);
		con34.setStyle(0, 0, .1, 0x9966ff, .7);
		
		con13.setStyle(0, 0, .1, 0x9966ff, .7);
		con24.setStyle(0, 0, .1, 0x9966ff, .7);
		
		con14.setStyle(1, 0x9966ff, .7);
		con23.setStyle(1, 0x9966ff, .7);

		
		this.addParticle(cir1);
		this.addParticle(cir2);
		
		this.addParticle(cir3);
		this.addParticle(cir4);
		
		this.addParticle(cir5);
		
		this.addConstraint(con12);
		this.addConstraint(con34);
		this.addConstraint(con13);
		this.addConstraint(con24);
		this.addConstraint(con23);
		this.addConstraint(con14);
		
		this.cir5 = cir5;
		this.cir1 = cir1;
		this.cir2 = cir2;
		
	},
	
	setSpeed: function(s){
		this.cir5.setAngularVelocity(s);
		this.cir5.setAngularVelocity(s);
	}
});