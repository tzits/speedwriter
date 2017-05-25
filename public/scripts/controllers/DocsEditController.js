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

    $scope.init = function(){
	    $http({
		method: 'GET',
		url: '/api/docs/'+ docId
		}).then(function successCallback(json) {
			vm.doc = json.data;
			console.log(vm.doc)
	        $scope.mainText = vm.doc.content
			var theUser = vm.doc.user;		
			$http({
				method: 'GET',
				url: '/api/users/' + theUser
			}).then(function successfulCallback(json) {
				vm.user = json.data;
				console.log(vm.user)
			})
		})
	};

    $scope.Timer = '00:00:00'

    $scope.pace = 1000

	$scope.start = function() {
		timer = $interval(function() {
			$scope.wordCount()
		    seconds++;
		    if (seconds >= 60) {
		        seconds = 0;
		        minutes++;
		        if (minutes >= 60) {
		            minutes = 0;
		            hours++;
			    }
			}
			$scope.Timer = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
		}, 1000)
	}

	$scope.stop = function() {
		$scope.logged = 'i hope against hope'
        $interval.cancel(timer);
    };


    $scope.clear = function() {
    	$scope.Timer = '00:00:00'
    	seconds = 0
    	minutes = 0
    	hours = 0
    }

    $scope.wordCount = function() {
    	if ($scope.mainText == '') {
    		$scope.logged = 0
    	} else {
    		var split = $scope.mainText.split(' ')
    		var noSpace = []
    		for (var i = 0; i < split.length; i ++) {
    			if (split[i] != '' && split[i] != "\n") {
    				noSpace.push(split[i])
    			}
    		$scope.logged = noSpace.length - vm.doc.start_count
    		}
    	}
    }

}
