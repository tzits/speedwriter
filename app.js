$(document).ready(function() {
	console.log("type away");

})

setInterval

function count() {
	setInterval(function() {
		console.log('counting')
		if ($('#mainText').val() == '') {
			$('#count').text(0)
		} else {
			var newVal = $('#mainText').val().split(' ').length
			$('#count').text(newVal)
			console.log(newVal)
		}
	}, 2000)
}

function startCount() {
	console.log('so far so good')
}