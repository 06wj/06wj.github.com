JPE.declare("Main", {
	
	skate: null,
	
	constructor: function(){
		var canvas = document.getElementById("myCanvas");
		var stage = this.stage = new Stage(canvas);

		var Vector = JPE.Vector,
			Engine = JPE.Engine,
			CircleParticle = JPE.CircleParticle,
			WheelParticle = JPE.WheelParticle,
			WheelParticle = JPE.WheelParticle,
			SpringConstraint = JPE.SpringConstraint;
		
		

		var Surfaces = JPE.Surfaces,
		    Car = JPE.Car,
			Skate = JPE.Skate;

		Engine.init(1/4);
			
		// set up the default diplay container
		Engine.container = stage;
		
		// gravity -- particles of varying masses are affected the same
		Engine.addMasslessForce(new Vector(0, 3));
		
		// groups - all these classes extend group
		var surfaces = new Surfaces();
		Engine.addGroup(surfaces);
		
		var skate = new Skate();
		Engine.addGroup(skate);
		this.skate = skate;
		skate.addCollidableList([surfaces]);
		
		var car = new Car();
		Engine.addGroup(car);
		this.car = car;
		car.addCollidableList([surfaces,skate]);

		
		//loop
		var owner = this;
		setInterval(function(){
			owner.run();
			window.fps ++;
		}, 16);

		YUI().use('node-base', function(Y)
		{
			Y.one(Y.config.doc).on('keydown', function(e)
			{
				owner.keyDownHandler(e);
			});
			Y.one(Y.config.doc).on('keyup', function(e)
			{
				owner.keyUpHandler(e);
			});
		});
	},
	
	run: function(s){
		JPE.Engine.step();
		JPE.Engine.paint();
		this.stage.update();
		this.skate.up.addMasslessForce(new JPE.Vector(0, -4));
	},

	keyDownHandler: function(keyEvt) {
		var keySpeed = 0.2;

		if (keyEvt.keyCode == 65) 
		{
			this.skate.setSpeed(-keySpeed);
		} 
		else if (keyEvt.keyCode == 68) 
		{
			this.skate.setSpeed(keySpeed);
		}
		
		if (keyEvt.keyCode == 37) 
		{
			this.car.setSpeed(-.5);
		} 
		else if (keyEvt.keyCode == 39) 
		{
			this.car.setSpeed(.5);
		}
	},
		
	keyUpHandler: function(keyEvt) 
	{
		this.skate.setSpeed(.2);
	}
});