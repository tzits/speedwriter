// var app = angular
// 	.module('speedwriter', ['ngRoute'])
// 	.config(config)

// config.$inject = ['$routeProvider', '$locationProvider']
// function config ( $routeProvider, $locationProvider) {
// 	$routeProvider
// 	.when('/', {
// 		templateUrl: 'views/templates/index.html',
// 		controllerAs: 'indCtrl',
// 		controller: 'IndexController'
// 	})
// 	.when('/about', {
// 		templateUrl: 'views/templates/about.html',
// 		controllerAs: 'aboutCtrl',
// 		controller: 'AboutController'
// 	})

// 	$locationProvider.html5Mode({
// 		enabled: true,
// 		requireBase: false
// 	})
// }





$(document).ready(function() {
	console.log("type away");

	var h1 = document.getElementsByTagName('h1')[0]
    var start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

	var text = document.getElementById('mainText')
	text.addEventListener('keydown', function(e){
		if (e.keyCode == 9) {
			e.preventDefault()
			console.log('indenting')
			$('#mainText').append(document.createTextNode('    '));
		} else if (e.keyCode == 13) {
			e.preventDefault()
			console.log('?')
			document.getElementById("mainText").value = document.getElementById("mainText").value + "\n        ";
        	return false;
    	}
	})



	function add() {
	    seconds++;
	    if (seconds >= 60) {
	        seconds = 0;
	        minutes++;
	        if (minutes >= 60) {
	            minutes = 0;
	            hours++;
	        }
	    }
	    
	    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

	    timer();
	}
	function timer() {
	    t = setTimeout(add, 1000);
	    count()
	}



	/* Start button */
	start.onclick = timer;

	/* Stop button */
	stop.onclick = function() {
	    clearTimeout(t);
	}

	/* Clear button */
	clear.onclick = function() {
	    h1.textContent = "00:00:00";
	    seconds = 0; minutes = 0; hours = 0;
	}


})

var indenting = true

function changeIndent() {

}

function changeSize() {
  		var size = parseInt($('select').val()) + 4
  		$('#mainText').attr('style','font-size:' + size + 'px')
  		return size
	}


function count() {
	setInterval(function() {
		console.log('counting')
		wordCount()
		convert($('#time').text())
	}, 1000)
}

function startCount() {
	console.log('so far so good')
}

function convert(time) {
	var separate = time.split(':')
	var hours = parseInt(separate[0])
	var minutes = parseInt(separate[1])
	var seconds = parseInt(separate[2])
	var words = wordCount()
	var total = hours + (minutes/60) + (seconds/3600)
	if (words/total > $('#num').val()) {
		$('#mainText').attr('style', 'color:black;font-size:' + changeSize() + 'px')
	} else {		
		$('#mainText').attr('style', 'color:red;font-size:' + changeSize() + 'px')
	}

}



function wordCount() {
	if ($('#mainText').val() == '') {
		$('#count').text(0)
		return 0
	} else {
		var newVal = $('#mainText').val().split(' ')
		var noSpace = []
		for (var i = 0; i < newVal.length; i++) {
			if (newVal[i] != '' && newVal[i] != "\n") {
				noSpace.push(newVal[i])
			}
		}
		$('#count').text(noSpace.length)
		return noSpace.length
	}
}

function hide() {
	$('#timer-container').attr('style','display:none')
	$('#show').attr('style','display:inline')
}
function show() {
	$('#timer-container').attr('style','display:inline')
	$('#show').attr('style','display:none')
}

function indent() {
	console.log('indent')
}
