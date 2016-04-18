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

	$('#submit-msg').click(function(){
		var originalUserMsg = $('#user-msg').val();
		userMsg = originalUserMsg;
		console.log(userMsg);
		text = ctx.measureText(userMsg);
		textSize = text.width;
		console.log(textSize);
		drawMsg(userMsg);
		$('#imageLoader').hide();
		$('#download').show();
		// $('#change_color').show();
	});

	function drawMsg(usertext){
		console.log("drawing messaage");
		ctx.fillStyle = 'white';
		ctx.font = "35px Roboto Condensed";
		var textSize = text.width;
		var yPosition = (canvas.height/1.1);
		var nextprextext = "#DearNextPresident";
		ctx.fillText(nextprextext.toUpperCase(), 10, yPosition-44);
		ctx.fillStyle = 'pink';
		ctx.font = "29px Roboto Condensed";
		ctx.fillText(usertext.toUpperCase(), 10, yPosition);
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
				var image = new Image();
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


	// ctx.drawImage(document.getElementById("cat"),0, 0);

	function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
			var img = new Image();
			img.onload = function(){
				// var max_width = 500;
				canvas.width = 500;
				canvas.height = 500;
				// ctx.drawImage(img, 0, 0, img.width, img.height);

				// if (img.width > max_width) {
				// 	img.height *= max_width / img.width;
				// 	img.width = max_width;
				// }
				// if (img.width < max_width){
				// 	img.width = max_width;
				// 	img.height *= max_width / img.width;
				// }
				// canvas.width = img.width;
				// canvas.height = img.height;
				// ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
 				// $('#upload-img').croppie({
					// 			    viewport: {
					// 			        width: 150,
					// 			        height: 200
					// 			    }
					// 			});
				// imgSize = calculateAspectRatio(img.width, img.height, canvas.width, canvas.height);
				// function calculateAspectRatio(src_width, src_height, max_width, max_height){
				// 	var ratio = Math.min(max_width/src_width, max_height/src_height);
				// 	var rtnWidth = src_width*ratio;
				// 	var rtnHeight = src_height*ratio;
				// 	return {
				// 		width: rtnWidth,
				// 		height: rtnHeight
				// 	};
				// }
				// ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				$('#imageLoader').hide();
				// canvas.width = imgSize.width;
				// canvas.height = imgSize.height;

			}
			img.src = event.target.result;
			// console.log(img.src);
			imageSource = img.src;
			cropAndScale(imageSource);
		}
		reader.readAsDataURL(e.target.files[0]);
		// var dataURLuploaded = reader.readAsDataURL(e.target.files[0]);
		// console.log(dataURLuploaded);
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