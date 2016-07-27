angular.module('myapp', ['ui.router']);

angular.module('myapp').constant('api_base', '/api');

angular.module('myapp').run(function($rootScope, api_base) {

  
});

angular.module('myapp').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  
  $urlRouterProvider.otherwise('/home');

  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'templates/home/index.html',
        controller: 'HomeController'
      }
    }
  });

});

angular.module('myapp').controller('HomeController', function($scope, Users) {
  // Users.getList().then(function(data) {
  //   console.log(data);
  // });

  Users.log_lol();
  $scope.test = "sono una variabile";
  
});

angular.module('myapp').service('Users', function($q, $http) {

  this.getList = function() {
    var deferred = $q.defer();

    $http({
      url: "",
      method: 'GET'
    }).then(function(data) {
      return deferred.resolve(data);
    }).error(function(data) {
      console.log("error", data)
    });

    return deferred.promise;
  };

  this.log_lol = function() {
    console.log('lol');
  };

});
