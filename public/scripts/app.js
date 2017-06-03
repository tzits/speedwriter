angular
  .module('SpeedWriter', ['ngRoute'])
  .config(config)
    
config.$inject = ['$routeProvider', '$locationProvider']    
function config(   $routeProvider,  $locationProvider   ) {
  $routeProvider
  	.when('/', {
      templateUrl: '../views/templates/welcome.html'
  	})
  	.when('/demo', {
      templateUrl: '../views/templates/demo.html',
      controllerAs: 'demoCtrl',
      controller: 'DemoController'  	
  	})
  	.when('/about', {
      templateUrl: '../views/templates/about.html' 	
  	})
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

function createDownload(dir) {
//		$('#docspan').text("<a download=" + dir + ">Download</a>")
	console.log(dir)
}

var newUser = {}

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



// function word() {
// 	console.log('word')
// 	var word = {
// 		title: "",
// 		content: ""
// 	}
// 	word.title = $('#title').val()
// 	word.content = $('#mainText').val()
// 	console.log(word)
// 	$.ajax({
// 		method: 'POST',
// 		data: word,
// 		url: 'api/word',
// 		success: newDocSuccess,
// 		error: newDocError
// 	})
// }

// function newDocSuccess() {
// 	console.log('woohoo')
// }

// function newDocError() {
// 	console.log('thats too bad')
// }

function newUserSuccess(data) {
	if (data == 'fail') {
    alert('Incorrect Username and Password Combo')
  }
  else {
    window.location.href = '/users/' + data
  }
}

function newUserError(data) {
}

