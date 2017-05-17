angular
  .module("SpeedWriter")
  .controller('DocsShowController', DocsShowController);

DocsShowController.$inject = ['$http', '$routeParams'];
	
function DocsShowController ( $http, $routeParams) {
	console.log($routeParams)
	var vm = this;
	console.log($routeParams.id);
	var docId= $routeParams.id
	console.log(docId)

	$http({
	method: 'GET',
	url: '/api/docs/'+ docId
	}).then(function successCallback(json) {
		vm.doc = json.data;
		console.log(vm.doc)
	})
}