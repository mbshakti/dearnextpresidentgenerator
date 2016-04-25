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
	imageLoader.addEventListener('change', handleImage, false);
	var imgSize;
	var useruploadedimage = $('#upload-img');
	var imageSource;
	var chicken;
	var image = new Image();
	var yPosition;
	var dnpLogo = new Image();
	var uploadedImg;


	$('#submit-msg').click(function(){
		var originalUserMsg = $('#user-msg').val();
		userMsg = originalUserMsg;
		console.log(userMsg);
		text = ctx.measureText(userMsg);
		textSize = text.width;
		console.log(textSize);
		$('#imageLoader').hide();
		$('#download').show();
	});

	var $text = document.getElementById("user-msg");

	function drawLogo(){
		ctx.shadowColor = "black";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		dnpLogo.src = "../img/logo-small.png" 
		ctx.drawImage(dnpLogo, 10, 20);
	}
	
	$text.onkeyup = function (e) {
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	    drawLogo();
	    wrapText(ctx, $text.value.toUpperCase(), 30, yPosition, 480, 30);
	}

	function wrapText(context, text, x, y, maxWidth, fontSize, fontFace) {
	    var words = text.split(' ');
	    var line = '';
	    var lineHeight = fontSize+5;

	    // context.font = fontSize + " " + fontFace;

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

	function downloadCanvas(link, canvasId, filename) {
	    link.href = document.getElementById(canvasId).toDataURL();
	    link.download = filename;
	}

	document.getElementById('download').addEventListener('click', function() {
	    downloadCanvas(this, 'upload-img', 'dearnextpresident.png');
	}, false);

	function cropAndScale(img){
		var basic = $('#demo-basic').croppie({
		    viewport: { width: 500, height: 500, type: 'square' },
		    boundary: { width: 600, height: 600 }
		});
		basic.croppie('bind', {
		    url: img,
		    points: [0,0,280,739]
		});

		$('#submit-button-box').show();
		$('.custom-file-upload').hide();

		//on button click

		$('#submit-button-box').click(function(){
			basic.croppie('result', {
				type: 'canvas',
				size: 'viewport'
			}).then(function(resp){
				// console.log(resp);
				chicken = resp;
				image.src = resp;
				ctx.drawImage(image, 0, 0, image.width, image.height);
			});
			$('#demo-basic').hide();	
			$('#upload-img').show();
			$('#user-msg').show();
			$('.countdown').show();
			$('#submit-msg').show();
			$('#submit-button-box').hide();
		});

	}



	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
			var img = new Image();
			img.onload = function(){
				canvas.width = 500;
				canvas.height = 500;
				$('#imageLoader').hide();

			}
			img.src = event.target.result;
			// console.log(img.src);
			imageSource = img.src;
			cropAndScale(imageSource);
		}
		reader.readAsDataURL(e.target.files[0]);
	}
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
	draw();
	updateCountDown();
	$('#user-msg').change(updateCountDown);
	$('#user-msg').keyup(updateCountDown);
};

function updateCountDown(){
	var remaining = 50 - $('#user-msg').val().length;
	$('.countdown').text(remaining+" characters left");
}

var twitterButton = $('.twitter-share');
var facebookButton = $('.facebook-share');

function shareOnSocial(button, imageurl){
	Share.init(button, {
	    title: 'share it',
	    url: imageurl
	});
}

$('.twitter-share').click(function(){
	shareOnSocial(twitterButton, uploadedImg);
});

$('.facebook-share').click(function(){
	shareOnSocial(facebookButton, uploadedImg);
});

$('#finished').click(function(){
	sentImgToServer('upload-img');
	console.log("finished click");
});


function sentImgToServer(canvasId){
  var dataURL = document.getElementById(canvasId).toDataURL();
  $.post('/img', {
  	imageDataUrl : dataURL
  }, function(response){
    console.log("Image Url: "+response.img);
    uploadedImg = response.img;
    $('.social').show();
  });
}


