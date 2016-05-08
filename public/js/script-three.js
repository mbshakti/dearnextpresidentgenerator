function draw(){
	console.log("Starting app");
	var canvas = document.getElementById("upload-img");
	var userImg = document.getElementById("cat");
	var imageLoader = document.getElementById('imageLoader');
	var whiteText = document.getElementById('#change_color_white');
	var blackText = document.getElementById('#change_color_black');
	var ctx = canvas.getContext('2d');
	var userMsg;
	var text;
	var textSize;
	var img = new Image();
	// imageLoader.addEventListener('change', handleImage, false);
	var imgSize;
	var useruploadedimage = $('#upload-img');
	var imageSource;
	var chicken;
	var image = new Image();
	var yPosition;
	var dnpLogo = new Image();
	var uploadedImg;

	var $text = document.getElementById("user-msg");


	$text.onkeyup = function (e) {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    // ctx.drawImage(image, 0, 0, image.width, image.height);
	    wrapText(ctx, $text.value.toUpperCase(), 30, yPosition, 480, 30);
	}

	function wrapText(context, text, x, y, maxWidth, fontSize, fontFace) {
	    var words = text.split(' ');
	    var line = '';
	    var lineHeight = fontSize+5;

	    for (var n = 0; n < words.length; n++) {
	        var testLine = line + words[n] + ' ';
	        var metrics = context.measureText(testLine);
	        var testWidth = metrics.width;
	        if (testWidth > maxWidth) {
				ctx.fillStyle = '#fff';
				ctx.shadowColor = "#383334";
				ctx.shadowOffsetX = 2;
				ctx.shadowOffsetY = 2;
				ctx.shadowBlur = 5;
	            context.fillText(line, x, y);
	            line = words[n] + ' ';
	            y += lineHeight;
	        } else {
	            line = testLine;
	        }
	    }
		ctx.font = "30px Roboto Condensed";
		yPosition = (canvas.height/1.5);
		var textwidth = ctx.measureText(line).width;
		ctx.fillStyle = '#fff';
		ctx.shadowColor = "#383334";
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.shadowBlur = 5;
		ctx.fillText(line, 30, y);
	    return (y);
	}
};

WebFontConfig = {
google: { families: [ 'Roboto+Condensed:700:latin' ] }
};



(function() {
var wf = document.createElement('script');
wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);
})();

window.onload = function(){
	draw();
	updateCountDown();
	$('#user-msg').change(updateCountDown);
	$('#user-msg').keyup(updateCountDown);
};

function updateCountDown(){
	var remaining = 50 - $('#user-msg').val().length;
	$('.countdown').text(remaining+" characters left");
}