angular
  .module("SpeedWriter")
  .controller('DocsIndexController', DocsIndexController);

DocsIndexController.$inject = ['$http','$scope','$location'];

function DocsIndexController ($http, $scope, $location) {
  console.log("angular in action")
	var vm = this
  var array = location.href.split('/')
  var userId = array[array.length-1]
	// vm.newPet = {};	
  $http({
    method: 'GET',
    url: '/api/users/' + userId + '/docs'
  }).then(function successCallback(response) {
    vm.docs = response.data;
  }, function errorCallback(response) {
    console.log('There was an error getting the data', response);
  });

  $scope.newDoc = function() {
    var newDoc = { 
      title: '',
      content: '',
      start_count: 0,
      user: userId
    }
    $http({
      method: 'POST',
      url: '/api/docs',
      data: newDoc
    }).then(function successCallback(response) {
      vm.newDoc = response.data;
      console.log(vm.newDoc)
      $location.path("/edit/" + vm.newDoc._id)
    }, function errorCallback(response) {
      console.log('no new doc')
    })
  }
}