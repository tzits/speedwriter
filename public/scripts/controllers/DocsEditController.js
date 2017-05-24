angular
  .module("SpeedWriter")
  .controller('DocsEditController', DocsEditController);

DocsEditController.$inject = ['$http', '$routeParams', '$scope'];
	
function DocsEditController ( $http, $routeParams, $scope) {
	console.log($routeParams)
	var vm = this;
	console.log($routeParams.id);
	var docId= $routeParams.id
	console.log(docId)

	$scope.log = function() {
		$scope.logged = "It worked"
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