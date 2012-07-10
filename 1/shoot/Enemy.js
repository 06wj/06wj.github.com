function Enemy()
{
	this.width = 55;
	this.height = 68;
	this.frames = {
		'stand':new MovieClip(),
		'run':new MovieClip(),
		'shoot':new MovieClip()
	};
	this.img = new Image();
	this.frame = 'stand';
}

Enemy.prototype.init = function(frames)
{
	mc.addFrame([
    {rect:[0,0,64,85], label:"stand", stop:1},
    {rect:[192,0,64,85], label:"walk"},
    {rect:[192,85,64,85], jump:"walk"},
    {rect:[320,0,64,85], label:"cheer"},
    {rect:[384,0,64,85]},
    {rect:[448,0,64,85], jump:"cheer"}]);
}