var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imgSize;
var imageLoader = document.getElementById('imageLoader');	
imageLoader.addEventListener('change', handleImage, false);

var $text = document.getElementById("sourceText");
$text.onkeyup = function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wrapText(ctx, $text.value, 20, 60, 300, 14);
}

$('#submit-msg').click(function(){
	$('#imageLoader').show();
});

function wrapText(context, text, x, y, maxWidth, fontSize, fontFace) {
    var words = text.split(' ');
    var line = '';
    var lineHeight = fontSize;

    context.font = fontSize + " " + fontFace;

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
	ctx.font = "14px Roboto Condensed";
    context.font = "14px Roboto Condensed";
    var yPosition = (imgSize/1.1);
	context.fillText(line, 10, y);
	ctx.fillText("#DearNextPresident", 2, 34);
    return (y);
}

function handleImage(e){
	var reader = new FileReader();
	reader.onload = function(event){
		var img = new Image();
		img.onload = function(){
			canvas.width = 500;
			canvas.height = 500;
			imgSize = calculateAspectRatio(img.width, img.height, canvas.width, canvas.height);
			function calculateAspectRatio(src_width, src_height, max_width, max_height){
				var ratio = Math.min(max_width/src_width, max_height/src_height);
				var rtnWidth = src_width*ratio;
				var rtnHeight = src_height*ratio;
				return {
					width: rtnWidth,
					height: rtnHeight
				};
			}
			ctx.drawImage(img, 0, 0, imgSize.width, imgSize.height);
			ctx.font = "24px Roboto Condensed";
			wrapText(ctx, $text.value, 20, 60, 300, 14);
			$('#sourceText').hide();

		}
		img.src = event.target.result;
	}
	reader.readAsDataURL(e.target.files[0]);
}

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
	updateCountDown();
	$('#user-msg').change(updateCountDown);
	$('#user-msg').keyup(updateCountDown);
};

function updateCountDown(){
	var remaining = 50 - $('#sourceText').val().length;
	$('.countdown').text(remaining+" characters left");
}