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
	this.addFrame([
	{rect:[0,0,53,68], label:"stand"},
	{rect:[53,0,53,68], jump:"stand"},
	{rect:[106,0,53,68], label:"run"},
	{rect:[159,0,53,68]},
	{rect:[212,0,53,68]},
	{rect:[265,0,53,68]},
	{rect:[318,0,53,68], jump:"run"},
	{rect:[371,0,53,68], label:"shoot"},
	{rect:[424,0,53,68]},
	{rect:[477,0,53,68]},
	{rect:[530,0,53,68]},
	{rect:[583,0,53,68]},
	{rect:[636,0,53,68]},
	{rect:[689,0,53,68]},
	{rect:[742,0,53,68], jump:"shoot"}]);
}