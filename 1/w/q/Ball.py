#coding utf-8
import math
class Vector():
    def __init__(self, x = 0, y = 0):
        self.x = x
        self.y = y
    def __str__(self):
        return "x:%10f, y:%10f" % (self.x, self.y)
    __repr__ = __str__
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)
    
    def set(self, x, y):
        self.x = x;
        self.y = y;

    def scale(self, s):
        self.x *= s
        self.y *= s

    def getLength(self):
        return round(math.sqrt(self.x * self.x + self.y * self.y), 6)

    def getAngle(self):
        return round(math.atan2(self.y, self.x), 6)

    def rotate(self, *arg):
        if len(arg) == 1:
            cos = math.cos(arg[0])
            sin = math.sin(arg[0])
        else:
            cos = arg[0]
            sin = arg[1]
        self.set(self.x * cos - self.y * sin, self.x * sin + self.y * cos)
 
holePoints = [[26, 25],[421, 17],[817, 23],[820, 407],[422, 416],[26, 408]];     

def createLines(m):
    points = [
        [27.1, 52.7 - m, 27.1, 383.5 + m],
        [52.4 - m, 408.9, 397.1 + m, 408.9],
        [448 - m, 408.9, 793 + m, 408.9],
        [818.5, 383.6 + m, 818.5, 52.9 -m],
        [793.1 + m, 27.5, 447.9 - m, 27.5],
        [397.1 + m, 27.5, 52.5 - m, 27.5],
    ];
    lines = []
    for point in points:
        line = [Vector(point[0], point[1]), Vector(point[2], point[3])]
        lines.append(line)
    return lines

lines = createLines(2)

r = 14
(SOLID, STRIP, WHITE, BLACK) = [1, -1, 0, 2]

class Ball(object):
    total = 0
    balls = []
    dies = []
    scale = .99
    
    def __str__(self):
        return str(self.loc) + ", num:%2d, type:%2d, v: (" % (self.num, self.type) + str(self.v) + " )"
    __repr__ = __str__
    def __del__(self):
        Ball.total -= 1

    def __init__(self, x = 0, y = 0):
        colors = ["#ffffff", "#E1AE07", "#064771", "#D7141A", "#1E1D63", "#E9520B", "#0A5326", "#900910", "#000000", "#E1AE07", "#064771", "#D7141A", "#1E1D63", "#E9520B", "#0A5326", "#900910"];
        
        Ball.total += 1
        Ball.balls.append(self)

        self.loc = Vector(x, y)
        self.num = Ball.total - 1
        self.col = colors[self.num]
        self.setType(self.num)
        self.v = Vector()
        self.isDie = False
        self.rect = None
       
    def setType(self, num):
        if num == 0:
            self.type = WHITE
        elif num < 8:
            self.type = SOLID
        elif num == 8:
            self.type = BLACK
        else :
            self.type = STRIP
    def move(self):
        if self.v.getLength() < .1:
            self.v.set(0, 0)
            return
        self.loc += self.v
        self.bounce()
        self.v.scale(Ball.scale)
        self.checkHole()

    def destory(self):
        self.isDie = True
        Ball.dies.append(self)
        Ball.balls.remove(self)
        print "deleteeeeeeeeeeeeeeeeee %2d" % self.num
    
    def checkHole(self):
        for hole in holePoints:
            lx = self.loc.x - hole[0]
            ly = self.loc.y - hole[1]

            if lx*lx + ly*ly < 300 and (not self.isDie):
                self.destory()
                return True
        return False

    def bounce(self):
        a = 0
        minx = 27 - a
        miny = 28 - a
        maxx = 818 + a
        maxy = 408 + a

        for line in lines:
            if self.checkLine(line):
                return
                
        if self.loc.x < minx or self.loc.y < miny or self.loc.x > maxx or self.loc.y > maxy and (not self.isDie):
            self.destory()
            return
        
    def checkLine(self, line):
        ang = (line[0] - line[1]).getAngle()
        
        cos = math.cos(ang)
        sin = math.sin(ang)

        temp = False

        nr = r
        if(self.v.getLength() > r):
            nr = self.v.getLength()
    
        line[0].rotate(cos, -sin)
        line[1].rotate(cos, -sin)

        self.loc.rotate(cos, -sin)
        self.v.rotate(cos, -sin)

        y = line[0].y
        x1 = line[0].x
        x2 = line[1].x

        if x1 > x2:
            xx = x1
            x1 = x2
            x2 = xx

        by = self.loc.y
        bx = self.loc.x
        vy = self.v.y

        if bx > x1 and bx < x2 and (by + nr > y and by - nr < y):
            self.loc.y = y - r if self.v.y > 0 else y + r
            self.v.y *= -1
            temp = True

        line[0].rotate(cos, sin)
        line[1].rotate(cos, sin)
        self.loc.rotate(cos, sin)
        self.v.rotate(cos, sin)

        return temp

def isStop():
    temp = True
    for ball in Ball.balls:
        if ball.v.getLength() > .01:
            temp = False
    return temp   

def createBalls():
    a3 = math.sqrt(3)+.1;
    ar = r;
    ballxy = [
	   0, -330, 0, 0, -ar,a3*ar,ar,a3*ar,-2*ar,2*a3*ar,0,2*a3*ar,2*ar,2*a3*ar,-3*ar,3*a3*ar,-ar,3*a3*ar,ar,3*a3*ar,3*ar,3*a3*ar,-4*ar,4*a3*ar,-2*ar,4*a3*ar,0,4*a3*ar,2*ar,4*a3*ar,4*ar,4*a3*ar
    ];

    for i in range(16):
        ball = Ball(600 + ballxy[2*i+1], 219+ballxy[2*i])

def checkCollision(b0, b1):
    if b0.isDie or b1.isDie or (b0.v.getLength()<.1 and b1.v.getLength()<.1):
        return

    s = b0.loc - b1.loc
    if s.getLength() < 2 * r :
        ang = s.getAngle()
        cos = math.cos(ang)
        sin = math.sin(ang)

        s.rotate(cos, -sin)
        b0.loc.rotate(cos, -sin)
        b0.v.rotate(cos, -sin)
        b1.loc.rotate(cos, -sin)
        b1.v.rotate(cos, -sin)

        s = 2 * r - abs(b0.loc.x - b1.loc.x)

        if b0.loc.x < b1.loc.x:
            b0.loc.x -= s * .5
            b1.loc.x += s * .5
        else :
            b0.loc.x += s * .5
            b1.loc.x -= s * .5

        tempv = b0.v.x
        b0.v.x = b1.v.x
        b1.v.x = tempv

        b0.loc.rotate(cos, sin)
        b0.v.rotate(cos, sin)
        b1.loc.rotate(cos, sin)
        b1.v.rotate(cos, sin)

        b1.loc += b1.v
        b0.loc += b0.v
        
def updateBalls():
    if isStop():
        return
    for b in Ball.balls:
        b.move()
    for i in range(len(Ball.balls)):
        for j in range(i + 1, len(Ball.balls)):
            checkCollision(Ball.balls[i], Ball.balls[j])

def checkDies(player):
    good = false
    for b in Ball.dies:
        if b.type == BLACK:
            if player.num == 7:
                print "win"
            else:
                print "lose"
        elif b.type == WHITE:
            pass
        elif not player.type:
            player.type = b.type
            good = True
            player.num += 1
            print "select type"
        elif player.type == b.type:
            good = True
            player.num += 1    
        elif player.type != b.type:
            player.next.num += 1
        
    if good:
        pass
    else:
        pass

createBalls()

def shoot(x = 0, y = 0):
    Ball.dies = []
    Ball.balls[0].v.set(x, y)
    while not isStop():
        updateBalls()
    printBalls()

def printBalls():
    print "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"
    for ball in Ball.balls:
        print ball
