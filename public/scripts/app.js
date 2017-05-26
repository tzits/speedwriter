angular
  .module('SpeedWriter', ['ngRoute'])
  .config(config)
    
config.$inject = ['$routeProvider', '$locationProvider']    
function config(   $routeProvider,  $locationProvider   ) {
  $routeProvider
    .when('/users/:id', {
      templateUrl: '../views/templates/documents.html',
      controllerAs: 'docsIndexCtrl',
      controller: 'DocsIndexController'
    })
    .when('/edit/:id', {
      templateUrl: '../views/templates/editdoc.html',
      controllerAs: 'docsEditCtrl',
      controller: 'DocsEditController'
    })
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}
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
	var startWordCount = $('#startWordCount').val()
	var newWords = words - startWordCount
	var total = hours + (minutes/60) + (seconds/3600)
	if (newWords/total > $('#num').val()) {
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

var newDoc = {
	title: "",
	start_count: 0,
	content: "",
	user_id: 1
}

var newUser = {
	name: "",
	username: "",
	password: ""
}

function saveDoc() {
	wordCount()
	newDoc.title = $('#title').val()
	newDoc.content = $('#mainText').val()
	newDoc.start_count = parseInt($('#total').text())
	console.log('lets save')
	$.ajax({
		method: 'POST',
		url: 'api/docs',
		data: newDoc,
		success: newDocSuccess,
		error: newDocError
	})
}

function getDoc() {
	var docId = '1'
	$.ajax({
		method: 'GET',
		url: 'api/docs/' + docId,
		success: getDocSuccess,
		error: getDocError

	})
}

function createDownload(dir) {
//		$('#docspan').text("<a download=" + dir + ">Download</a>")
	console.log(dir)
}

function signUp() {
	newUser.name = $('#name').val()
	newUser.email = $('#email').val()
	newUser.password = $('#password').val()
	$.ajax({
		method: 'POST',
		url: 'api/users',
		data: newUser,
		success: newUserSuccess,
		error: newUserError
	})
}

function login() {
	newUser.email = $('#email1').val()
	newUser.password = $('#password1').val()
	console.log('sending:', newUser.email, newUser.password)
	$.ajax({
		method: 'POST',
		url: '/login',
		data: newUser,
		success: newUserSuccess,
		error: newUserError
	})
}

function deleteDoc(id) {
	var docId = id;
	$.ajax({
		method: 'DESTROY',
		url: 'api/docs/' + docId,
		success: destroyDocSuccess,
		error: destroyDocError
	})
}



function word() {
	console.log('word')
	var word = {
		title: "",
		content: ""
	}
	word.title = $('#title').val()
	word.content = $('#mainText').val()
	console.log(word)
	$.ajax({
		method: 'POST',
		data: word,
		url: 'api/word',
		success: newDocSuccess,
		error: newDocError
	})
}

function newDocSuccess() {
	console.log('woohoo')
}

function newDocError() {
	console.log('thats too bad')
}

function newUserSuccess() {
	console.log('woohoo')
}

function newUserError() {
	console.log('thats too bad')
}

function getDocSuccess(id) {
	console.log('woohoo')
	window.location = '/users/' + id
}

function getDocError() {
	console.log('thats too bad')
}

function updateDocSuccess() {
	console.log('woohoo')
}

function updateDocError() {
	console.log('thats too bad')
}