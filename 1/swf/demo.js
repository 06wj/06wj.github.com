package  
{
	import gs.TweenLite;
	import flash.geom.Matrix;
	import flash.events.Event;
	import flash.display.Sprite;
	import flash.display.GradientType;
	import flash.events.MouseEvent;
	import fl.motion.easing.Linear;
	import flash.text.TextField;
	import flash.display.StageScaleMode;
	
	public class Main extends Sprite
	{
		[Embed(source="boder.png",scaleGridTop="24",scaleGridBottom="25",scaleGridLeft="24",scaleGridRight="25")]
		private var Menu:Class;
		
		[Embed(source="cloud.png")]
		private var Cloud:Class;
		
		[Embed(source="gril.png")]
		private var Gril:Class;
		
		[Embed(source="d2.png")]
		private var D2:Class;
		
		private var i:int;
		private var cloud:Sprite = new Sprite();
		private var texts = ["New Game", "Loading Game", "Option", "Exit Game"];
		
		public function Main() 
		{
			stage.scaleMode = StageScaleMode.NO_SCALE;
			
			initBack();
			initCloud();
			initGril();
			initMenus();
			initD2();
		}
		
		private function initBack()//画渐变背景
		{
			var fillType:String = GradientType.LINEAR;
			var colors:Array = [0x4964ff, 0xffffff];
			var alphas:Array = [1, 1];
			var ratios:Array = [0, 188];
			var matrix = new Matrix();
			matrix.rotate(Math.PI / 2);
			graphics.beginGradientFill(fillType, colors, alphas, ratios, matrix);  
			graphics.drawRect(0,0,640,480);
		}
		
		private function initCloud()
		{
			var tempCloud = new Cloud();
			var tempCloud2 = new Cloud();
			cloud.addChild(tempCloud);
			cloud.addChild(tempCloud2);
			tempCloud2.x = 700;
			addChild(cloud);
			
			addEventListener(Event.ENTER_FRAME,run);//云运动
		}
		
		private function initGril()
		{
			var gril = new Gril();
			addChild(gril);
			gril.y = 82;
		}
		
		private function initMenus()
		{
			for(i = 0;i < 4;i++)
			{
				var menu = new Menu();
				var fillType:String = GradientType.LINEAR;
				var colors:Array = [0xc66c22, 0xf3eeb3, 0xc66c22];
				var alphas:Array = [1, 1, 1];
				var ratios:Array = [0, 127, 255];
				
				menu.x = 62 ;
				menu.y = 207 + 56* i;
				menu.width = 160;
				menu.height = 40;
				menu.alpha = .5;
				
				menu.graphics.beginGradientFill(fillType, colors, alphas, ratios);  
				menu.graphics.drawRect(0,0,48,48);
				
				addChild(menu);
				menu.addEventListener(MouseEvent.MOUSE_OUT, mouseOut);
				menu.addEventListener(MouseEvent.MOUSE_OVER, mouseOver);
				
				TweenLite.from(menu, 1, {x:640, delay:i*.1} );//menu的运动
			}
		}
		
		private function initD2()
		{
			var d2 = new D2();
			addChild(d2);
			d2.x = 369;
			d2.y = 31;
			
			TweenLite.from(d2, 1.5, { x:-200, scaleX:20, scaleY:20, delay:1, alpha:0, ease:Linear.easeIn} );//D2的运动
		}
		
		private function run(e:Event):void
		{
			cloud.x -= 1;
			if(cloud.x < -700) cloud.x = 0;
		}
		
		private function mouseOut(e:MouseEvent):void
		{
			var menu = e.target;
			TweenLite.to(menu, .3, { x:62, width :160, height:40, alpha:.5 } )//鼠标移出动画
		}
		
		private function mouseOver(e:MouseEvent):void
		{
			var menu = e.target;
			TweenLite.to(menu,.3,{ x:42, width :200, height:48,alpha:1})//鼠标移入动画
		}
	}
}



