(function(){
    var SnakeBody = Game.SnakeBody;
    var Snake = Game.Snake = function(props)
    {
        this.loc = new Vector(0, 0);
        this.v = new Vector(8,0);
        this.v.rotate(Math.random()*Math.PI*2);
        this.a = new Vector(0, 0);
        this.wanderAngle = 1;
        
        Game.merge(this, props);
        
        this.head = new SnakeBody({height:30,before:this.loc});
        this.tail = this.head;
        this.add();
    };

    Snake.prototype.add = function()
    {
        var body = new SnakeBody({width:40,height:15,before:this.tail});
        this.tail = body;
    };

    Snake.prototype.update = function()
    {
        this.loc.plus(this.v);
        this.v.plus(this.a);
        this.v.cut(6);
        this.bounce();
        this.eatFood();
    };

    Snake.prototype.bounce = function()
    {
        var minx = 0,miny = 0,maxx = 800,maxy = 600;

        if(this.loc.x < minx) 
        {
            this.loc.x = minx;
            this.v.x *= -1;
        }
        else if(this.loc.x > maxx) 
        {
            this.loc.x = maxx;
            this.v.x *= -1;
        } 

        if(this.loc.y < miny) 
        {
            this.loc.y = miny;
            this.v.y *= -1;
        }
        else if(this.loc.y > maxy) 
        {
            this.loc.y = maxy;
            this.v.y *= -1;
        };
    };

    Snake.prototype.wander = function()
    {
        this.wanderAngle += Math.random() - .5; 
        
        var center = this.v.getClone();
        center.setLength(100);
        
        var offset = new Vector();
        offset.setLength(50);
        offset.setAngle(this.wanderAngle);
        
        this.a = center.plusNew(offset);
        this.a.cut(1);
    };

    Snake.prototype.search = function(point)
    {
    	
    };

    Snake.prototype.eatFood = function()
    {
        /*var x = this.loc.x - Snake.food.x;
        var y = this.loc.y - Snake.food.y;
        var r = Snake.food.r + this.head.height*.5;
        if((x*x+y*y) < r*r)
        {
            this.add();
            Snake.food.init();
        }*/
    };


    Snake.food = {
        x:110,
        y:110,
        r:10,
        time:20,
        color:"#ff9966",
        init:function()
        {
            this.color = "#" + parseInt(Math.random()*0xffffff).toString(16);
            this.x = Math.random()* 800;
            this.y = Math.random()* 600;
        },
        render:function()
        {
            this.time++;
            var lr;
            if(this.time > 70)
            {
                this.time = this.r*2;
            }
            lr = this.time*.5;
            Game.context.save();
            Game.context.beginPath();
            Game.context.fillStyle = this.color;
            
            Game.context.globalAlpha = (90-this.time)/80;

            Game.context.arc(this.x, this.y, lr, 0, Math.PI*2);
            Game.context.fill();
            Game.context.globalAlpha = .8;
            Game.context.beginPath();
            Game.context.arc(this.x, this.y, this.r, 0, Math.PI*2);
            Game.context.fill();
            //Game.context.stroke();
            
            Game.context.restore();
        }
    };

})()