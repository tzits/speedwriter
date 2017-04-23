$(document).ready(function() {
	console.log("type away");

})

function count() {
	var newVal = $('#mainText').val().split(' ').length
	$('#count').text(newVal)
	console.log(newVal)
}