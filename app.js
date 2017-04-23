$(document).ready(function() {
	console.log("type away");

})

function count() {
	if ($('#mainText').val() == '') {
		$('#count').text(0)
	} else {
		var newVal = $('#mainText').val().split(' ').length
		$('#count').text(newVal)
		console.log(newVal)
	}
}