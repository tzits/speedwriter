angular
  .module("SpeedWriter")
  .controller('DocsEditController', DocsEditController);

DocsEditController.$inject = ['$http', '$routeParams', '$scope', '$interval', '$window'];
	
function DocsEditController ( $http, $routeParams, $scope, $interval, $window) {
	console.log($routeParams)
    console.log($scope.docTitle)
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

    $scope.autoindent = true

    $scope.trackSpeed = true

    $scope.keydownevt = function () {
        if ($scope.autoindent == true) {
            if (event.keyCode == 13){
                event.preventDefault()
                var caretPos = $('#mainText')[0].selectionStart;
                console.log(caretPos)
                var textAreaTxt = $('#mainText').val();
                var txtToAdd = "\n        ";
                var restart = caretPos + txtToAdd.length
                $('#mainText').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
                $('#mainText').prop('selectionStart', restart)
                $('#mainText').prop('selectionEnd', restart)
            } else if (event.keyCode == 9){
                event.preventDefault()
                var caretPos = $('#mainText')[0].selectionStart;
                var textAreaTxt = $('#mainText').val();
                var txtToAdd = "        ";
                var restart = caretPos + txtToAdd.length
                $('#mainText').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
                $('#mainText').prop('selectionStart', restart)
                $('#mainText').prop('selectionEnd', restart)
            }
        } else {
            if (event.keyCode == 13){
                event.preventDefault()
                var caretPos = $('#mainText')[0].selectionStart;
                console.log(caretPos)
                var textAreaTxt = $('#mainText').val();
                var txtToAdd = "\n";
                var restart = caretPos + txtToAdd.length
                $('#mainText').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos) );
                $('#mainText').prop('selectionStart', restart)
                $('#mainText').prop('selectionEnd', restart)
            }
        }
    }


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
                $scope.docTitle = 'controllers' + vm.doc.title.replace(/\s/g, '') + '.docx'
			})
		})
	};


    $scope.Timer = '00:00:00'

    $scope.pace = 1000

	$scope.start = function() {
		timer = $interval(function() {
			$scope.wordCount()
			$scope.addEm()
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
			var total = parseFloat(hours) + parseFloat(minutes/60) + parseFloat(seconds/3600)
			$scope.color(total)
		}, 1000)
	}

	$scope.stop = function() {
        $interval.cancel(timer);
    };


    $scope.clear = function() {
    	$scope.Timer = '00:00:00'
    	seconds = 0
    	minutes = 0
    	hours = 0
    }

    $scope.cancel = function() {
        $http({
            method: 'DELETE',
            url: '/api/docs/' + $('#doc_id').text()
        }).then(function successCallback(response) {
            console.log('gonezo')
            $window.history.back()
        }, function errorCallback(response) {
          console.log(response,'this is sad')
        })
    }

    $scope.back = function() {
        $window.history.back()
    }

    $scope.wordCount = function() {
    	if ($scope.mainText == '') {
    		$scope.logged = 0;
            return 0;
    	} else {
    		var count = 0
    		var split = $scope.mainText.split(' ')
    		var noSpace = []
    		for (var i = 0; i < split.length; i ++) {
    			if (split[i] != '' && split[i] != "\n") {
    				noSpace.push(split[i])
    			}
    		}
    		$scope.logged = noSpace.length - vm.doc.start_count
            return noSpace.length
    	}
    }
    $scope.addEm = function() {
    	$scope.total = parseInt($scope.wordCount())
    }

    $scope.color = function(total) {
        if ($scope.trackSpeed == true) {
        	if ($scope.logged / total > $scope.pace) {
    			$('#mainText').attr('style', 'color:black;font-size:' + $scope.changeSize() + 'px')
        	} else {
    			$('#mainText').attr('style', 'color:red;font-size:' + $scope.changeSize() + 'px')
        	}
        }
    }

    $scope.changeSize = function() {
    	var size = parseInt($('select').val()) + 4
		return size
    }

    $scope.updateDoc = function() {
    	var updatedDoc = {};
    	updatedDoc.content = $('#mainText').val();
    	updatedDoc.title = $('#title').val();
		updatedDoc.start_count = parseInt($scope.wordCount());
		var docId = $('#doc_id').text();
		console.log(updatedDoc);
		$http({
			method: 'PATCH',
			url: '/api/docs/' + docId,
			data: updatedDoc
		}).then(function successCallback(json) {
			vm.doc = json.data;
			console.log(vm.doc)
			window.location = '/users/' + vm.doc.user
		})
    }


}
