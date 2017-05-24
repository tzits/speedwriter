angular
  .module("SpeedWriter")
  .controller('DocsEditController', DocsEditController);

DocsEditController.$inject = ['$http', '$routeParams', '$scope', '$interval'];
	
function DocsEditController ( $http, $routeParams, $scope, $interval) {
	console.log($routeParams)
	var vm = this;
	console.log($routeParams.id);
	var docId= $routeParams.id
	console.log(docId)
	var h1 = document.getElementsByTagName('h1')[0],
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

	$scope.log = function() {
		$scope.logged = "It worked"
	}
	$scope.start = function() {
		$scope.logged = "Timer should start now"
		timer = $interval(function() {
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
		}, 1000)

	}

	$http({
	method: 'GET',
	url: '/api/docs/'+ docId
	}).then(function successCallback(json) {
		vm.doc = json.data;
		console.log(vm.doc)
		var theUser = vm.doc.user;		
		$http({
			method: 'GET',
			url: '/api/users/' + theUser
		}).then(function successfulCallback(json) {
			vm.user = json.data;
			console.log(vm.user)
		})
	})
}