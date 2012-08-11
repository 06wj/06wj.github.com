var lineImage = new Image();

(function(){
		var canvas = Q.createDOM('canvas',{width:1,height:2});
		var context = canvas.getContext('2d');
		context.fillStyle = "#fff";
		context.fillRect(0, 0, 1, 2);
		var url = canvas.toDataURL();
		lineImage.src = url;		
})();

function Line(props)
{
	Q.Bitmap.call(this, props);
	
}
Q.inherit(Line, Q.Bitmap);










