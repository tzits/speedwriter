angular
  .module("SpeedWriter")
  .controller('DocsIndexController', DocsIndexController);

DocsIndexController.$inject = ['$http'];

function DocsIndexController ($http) {
  console.log("angular in action")
	var vm = this
	// vm.newPet = {};	
  $http({
    method: 'GET',
    url: '/api/docs'
  }).then(function successCallback(response) {
    vm.docs = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });
}