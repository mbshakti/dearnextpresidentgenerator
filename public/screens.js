var app = {};

app.init = function(){
	hashRouter();
	// location.hash = ''; // refresh 
	location.hash = '#welcome';
	attachEvents();
	console.log('Starting app...')
}

function hashRouter(){
	$(window).off('hashchange').on('hashchange', function(){
		if(location.hash == '#welcome'){
			welcomeScreen();
		} else if (location.hash == '#start'){
			startScreen();
		} else if (location.hash == '#chat'){
			renderChat();
		} else if (location.hash == '#thankyou'){
			renderThankyou();
		} else if (location.hash == '#seeking'){
			renderSeeking();	
		}
		attachEvents();
	});
}

function attachEvents(){
	$('#chat-button').on('click', function(){
		var phone = $('#phone_number').val();
		// var userphones = {
		// 	number: userphone
		// }
		var userphone = '+1'+phone;
		console.log(userphone);
		socket.emit('user phone', userphone);
		location.hash = '#seeking';
		console.log('click');
	});
	$('#friend-button').on('click', function(){
		location.hash = '#chat';
		console.log('seeking a friend');
	});
	$('#phone-button').on('click', function(){
		location.hash = '#start';
		console.log('seeking a friend');
	});
	$('#dating-button').on('click', function(){
		location.hash = '#chat';
		console.log('seeking a date');
	});
	$('#nothing-button').on('click', function(){
		location.hash = '#chat';
		console.log('seeking nothing');
	});
}

//welcome
function welcomeScreen(){
	var tplToCompile = $('#tpl-welcome').html();
	var compiled = _.template(tplToCompile, {
	});
	$('.container').html(compiled);
	console.log("Welcome...");
}




app.init();