JPE.declare("Skate", {

	superclass: JPE.Group,
	
	constructor: function(){

		JPE.Skate.superclass.prototype.constructor.apply(this);

		var CircleParticle = JPE.CircleParticle,
		WheelParticle = JPE.WheelParticle,
		SpringConstraint = JPE.SpringConstraint;
		
		var loc = {
			x:333,
			y:320
		};
	
		var cir1 =  new WheelParticle(loc.x, loc.y, 10);
		var cir2 =  new WheelParticle(loc.x + 100, loc.y, 10);
		
		var cir3 = new CircleParticle(loc.x ,loc.y - 20,5);
		var cir4 = new CircleParticle(loc.x + 100 , loc.y - 20, 5);
		
		var cir5 = new CircleParticle(loc.x - 15,loc.y - 20 - 5,5);
		var cir6 = new CircleParticle(loc.x + 100 + 15 ,loc.y - 20 - 5,5);
		
		var up = new CircleParticle(loc.x + 100 , loc.y - 150, 11);
		
		var con12 = new SpringConstraint(cir1, cir2, 1);
		var con34 = new SpringConstraint(cir3, cir4, 1,true,10);
		var con13 = new SpringConstraint(cir1, cir3, 1);
		var con24 = new SpringConstraint(cir2, cir4, 1);
		
		var con15 = new SpringConstraint(cir1, cir5, 1);
		var con26 = new SpringConstraint(cir2, cir6, 1);
		var con35 = new SpringConstraint(cir3, cir5, 1,true,10);
		var con46 = new SpringConstraint(cir4, cir6, 1,true,10);
		
		
		var con14 = new SpringConstraint(cir1, cir4, 1);
		var con23 = new SpringConstraint(cir2, cir3, 1);
		
		var con54 = new SpringConstraint(cir5, cir4, 1);
		var con63 = new SpringConstraint(cir6, cir3, 1);
		
		var conUp = new SpringConstraint(cir4, up, .7,true,3);
		
		cir1.setStyle(3, 0xff9966,1, 0, .1);
		cir2.setStyle(3, 0xff9966,1, 0, .1);
		
		cir3.setStyle(0, 0, 0,0xff9966, .7);
		cir4.setStyle(0, 0, 0,0xff9966, .7);
		
		cir5.setStyle(0, 0, 0, 0xff9966, .7);
		cir6.setStyle(0, 0, 0, 0xff9966, .7);
		
		up.setStyle(0, 0, 0, 0x99ff66, .7);
		
		con12.setLine(1, 0xff9966);
		con13.setLine(1, 0xff9966);
		con24.setLine(1, 0xff9966);
		con14.setLine(1, 0xff9966);
		con23.setLine(1, 0xff9966);
		
		con15.setLine(1, 0xff9966);
		con26.setLine(1, 0xff9966);
		con54.setLine(1, 0xff9966);
		con63.setLine(1, 0xff9966);
		
		con34.setStyle(0, 0, 0, 0xff9966, .7);
		con35.setStyle(0, 0, 0, 0xff9966, .7);
		con46.setStyle(0, 0, 0, 0xff9966, .7);
		
		conUp.setStyle(0, 0, 0, 0x99ff66, .7);
		
		
		this.addParticle(cir1);
		this.addParticle(cir2);
		this.addParticle(cir3);
		this.addParticle(cir4);
		this.addParticle(cir5);
		this.addParticle(cir6);
		
		
		this.addConstraint(con12);
		this.addConstraint(con34);
		this.addConstraint(con13);
		this.addConstraint(con24);
		this.addConstraint(con14);
		this.addConstraint(con23);
		this.addConstraint(con15);
		this.addConstraint(con26);
		this.addConstraint(con35);
		this.addConstraint(con46);
		this.addConstraint(con54);
		this.addConstraint(con63);
		
		this.addConstraint(conUp);
		this.addParticle(up);
		
		this.cir1 = cir1;
		this.cir2 = cir2;
		this.up = up;
		
	},
	
	setSpeed: function(s){
		this.cir1.setAngularVelocity(s);
		this.cir2.setAngularVelocity(s);
	}
});