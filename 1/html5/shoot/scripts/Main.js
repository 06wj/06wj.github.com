var fps = 30;
var time = 0;
var key = {};
var enemys, bombs, bullets, objs;
var myCanvas = document.getElementById("main");
var g = myCanvas.getContext("2d");
var fpsTime, nowFps;
var enemyTime = 10;
var gameStart = false;

function main() 
{
    init();
    setInterval("drawAll()", 1000 / 24);
    setInterval("updateAll()", 1000 / fps)
    //setInterval("startLoop()", 1000 / fps)
}

function drawScore() 
{
    g.save();
    g.fillStyle = "#fff";
    g.fillText("SCORE: " + player.score, 400, 10);
    //g.fillText("Made By 06wj", 10, 10);
    g.restore()
}

function startLoop()
{
	gameStart.update();
	updateObjs();
	drawObjs();
}

function init() 
{
    time = 0;
    key = {};
    enemys = [];
    bombs = [];
    bullets = [];
    objs = [enemys, bombs, bullets];
    fpsTime = +new Date()
}

function loop() 
{
    updateAll();
    drawAll()
}

function updateAll() 
{
    time++;
	player.update();
    updateObjs();
    addEnemy()
}

function drawAll() 
{
    ground.draw();
    player.draw();
    drawObjs();
    drawScore();
}

function updateObjs() {
    var i, j, obj;
    for (i = 0; i < 3; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++)
		{
			obj[j].update();
			if (obj[j].isDie) 
			{
				obj[j] = null;
				obj.splice(j, 1);
				j--;
			}
		}
      
    }
}

function drawObjs() 
{
    var i, j, obj;
    for (i = 0; i < 3; i++) 
	{
        obj = objs[i]; 
		for (j = 0; j < obj.length; j++) 
		{
			obj[j].draw()
		}
        
    }
}

function addEnemy() 
{
    var enemy;
    if (time % enemyTime === 1) {
        var temp = Math.random();
        if (player.score < 100) {
            enemy = new Enemy(tool.random(50, 450), 0)
        } else if (player.score < 250) {
            if (temp < .5) {
                enemy = new Enemy2(tool.random(50, 450), 0)
            } else {
                enemy = new Enemy(tool.random(50, 450), 0)
            }
        } else if (player.score < 450) {
            if (temp < .3) {
                enemy = new Enemy2(tool.random(50, 450), 0)
            } else if (temp < .7) {
                enemy = new Enemy(tool.random(50, 450), 0)
            } else {
                enemy = new Enemy3(tool.random(50, 450), 0)
            }
        } else if (player.score < 650) {
            enemyTime = 8;
            enemy = new Enemy3(tool.random(50, 450), tool.random(0, 50))
        } else {
            enemyTime = 5;
            enemy = new Enemy3(tool.random(50, 450), tool.random(0, 50))
        }
        enemys.push(enemy)
    }
}

document.onkeydown = function(e) 
{
    e.preventDefault();
	key[e.keyCode] = true;
    if (e.keyCode === K_SPACE) {
        hasGround = !hasGround
    }
};

document.onkeyup = function(e)
 {
    e.preventDefault();
	key[e.keyCode] = false
};

document.ontouchstart = function(e)
{
	e.preventDefault();
};




