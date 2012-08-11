#coding utf-8
from Tkinter import *
from Ball import *

class Game(Frame):
    def __init__(self,master=None, *args, **kwargs):
        Frame.__init__(self, master)
        self.master = master
        self.cv = Canvas(master,width =  847,height = 438)
        self.cv.pack()
    def run(self): 
        updateBalls()
        for b in Ball.balls:
            b.rect = self.cv.create_oval((b.loc.x - r, b.loc.y - r,b.loc.x + r, b.loc.y + r), fill = b.col)
        for l in lines:
            self.cv.create_line((l[0].x, l[0].y, l[1].x, l[1].y), fill = "#000000")
        self.after(250, self.display)
    def display(self):
        updateBalls()
        for b in Ball.balls:
            self.cv.coords(b.rect, (b.loc.x - r, b.loc.y - r,b.loc.x + r, b.loc.y + r))
        for b in Ball.dies:
            self.cv.coords(b.rect, (0, 0, 0, 0))
            Ball.dies.remove(b)
        self.after(10,self.display)

def createLines(m):
    points = [
        [8.7, 34.2, 27.1, 52.7],
        [27.1, 52.7 - m, 27.1, 383.5 + m],
        [27.1, 383.5, 8.7, 402],
        
        [34.2, 427.4, 52.4, 408.9],
        [52.4 - m, 408.9, 397.1 + m, 408.9],
        [397.1, 408.9, 407.2, 429.7],
        
        [437.9, 429.7, 448, 408.9],
        [448 - m, 408.9, 793 + m, 408.9],
        [793, 408.9, 811.4, 427.5],
        
        [837, 402.3, 818.5, 383.6],
        [818.5, 383.6 + m, 818.5, 52.9 -m],
        [818.5, 52.9, 837, 34.4],
        
        [811.6, 9.1, 793.1, 27.1],
        [793.1 + m, 27.5, 447.9 - m, 27.5],
        [447.9, 27.5, 437.9, 6.6],
        
        [407.3, 6.6, 397.1, 27.5],
        [397.1 + m, 27.5, 52.5 - m, 27.5],
        [52.5, 27.5, 34.1, 9] 
    ];
    lines = []
    for point in points:
        line = [Vector(point[0], point[1]), Vector(point[2], point[3])]
        lines.append(line)
    return lines        

root = Tk()
game = Game(root)

#Ball.scale = 1
lines = createLines(2)
Ball.balls[0].v.set(20, 0)
game.run()
game.mainloop()