function Piano()
{
    this.elem = document.createElement("div");   
    
    this.x = 0;
    this.elem.style.display = "none";
    this.elem.style.backgroundImage = "url(" + circles.src + ")";
    this.elem.style.backgroundPosition = "0px 0px";
    this.elem.style.backgroundRepeat = "no-repeat";
    this.elem.style.width = "63px"; 
    this.elem.style.height = "16px";
	this.elem.style.webkitTransform = "translate(" + this.x + "px, 245px)" ;
	this.die = true;
    this.frame = 0;
}

Piano.prototype.render = function()
{
   this.frame++;
   if(this.frame < 70)
   {
       this.elem.style.backgroundPosition = -this.frame * 63 + "px 0px";    
   }
   else if(this.frame == 70) 
   {
        this.elem.style.backgroundImage = "url(img/piano.png)";
        this.elem.style.backgroundPosition = "0px 0px";
        this.elem.style.backgroundRepeat = "no-repeat";
        this.elem.style.width = "140px"; 
        this.elem.style.height = "130px";
        this.elem.style.webkitTransform = "translate(" + (this.x -20)+ "px, 155px)" ;
     
   }
   else if(this.frame > 70 && this.frame < 83)
   {
         this.elem.style.backgroundPosition = -(this.frame-70) * 140 + "px 0px";    
   }
   else
   {
		this.elem.style.display = "none";
		this.die = true;
   }
    
};

Piano.prototype.init = function()
{
	this.x = Math.random()*500;
	this.elem.style.display = "block";
    this.elem.style.backgroundImage = "url(" + circles.src + ")";
    this.elem.style.backgroundPosition = "0px 0px";
    this.elem.style.backgroundRepeat = "no-repeat";
    this.elem.style.width = "63px"; 
    this.elem.style.height = "16px";
	this.elem.style.webkitTransform = "translate(" + this.x + "px, 245px)" ;
	this.die = false;
    this.frame = 0;
};

Piano.prototype.hide = function()
{
	this.elem.style.display = "none";
	this.die = true;
};

var circles = new Image();
(function(){
    var canvas = document.createElement("canvas");
    
	var time,r,x;
	x = 35*.9;
	canvas.width = x * 140;
	canvas.height = x * 2;
	var context = canvas.getContext("2d");
	for(time = 0; time < 70;time+=1)
	{
		r = time * .45;
		context.save();
		context.scale(1,.25);
		context.beginPath();
		context.fillStyle = 'rgba(33,33,33,.3)';
		context.arc(time * 2 * x - x, x, r, 0, Math.PI*2);
		context.fill();
		context.restore();
	}
    circles.src = canvas.toDataURL();
})()



var pianos = [];
function createPianos()
{
	var piano;
	var pianoDiv = document.getElementById("piano");
	for(var i = 0;i < 10; i ++)
	{
		piano = new Piano();
		pianoDiv.appendChild(piano.elem);
		pianos[i] = piano;
	}
}






























