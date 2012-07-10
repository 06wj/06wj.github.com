(function(){

var Box = Game.Box = function(props)
{
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.rotation = 0;
    this.color = "#" + parseInt(Math.random()*0xffffff).toString(16);

    Game.merge(this, props);

    Box.add(this);
};

Box.prototype.render = function()
{
    var context = Game.context;
    context.save();
    context.fillStyle = this.color;
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.globalAlpha = .3;
    context.fillRect(0, -this.height/2, this.width, this.height);
    context.beginPath();
    //context.globalAlpha = 1;
    context.globalAlpha = .5;
    context.arc(0, 0, this.height/2, 0, Math.PI*2);
    context.arc(this.width, 0, this.height/2, 0, Math.PI*2);
    context.fill(); 
    
    //context.beginPath()
    //context.arc(0, 0, 2, 0, Math.PI*2);
    //context.arc(this.width, 0, 2, 0, Math.PI*2);
    //context.stroke();
   
    context.restore();
};

Box.prototype.update = function(){};

Box.prototype.getBottomX = function()
{
    return this.x + this.width * Math.cos(this.rotation);
};

Box.prototype.getBottomY = function()
{
    return this.y + this.width * Math.sin(this.rotation);
    
};

Box.container = [];

Box.add = function(box)
{
  Box.container.push(box);  
};

Box.render = function()
{
  var i,box,len = this.container.length;
  for(i = 0;i < len;i++)
  {
    Box.container[i].render();
    Box.container[i].update();
  }
};

})();