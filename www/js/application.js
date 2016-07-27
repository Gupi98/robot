angular.module('angular_starter', ['ui.router']);

angular.module('angular_starter').run(function($rootScope) {});

angular.module('angular_starter').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  });
  return $urlRouterProvider.otherwise('/home');
});

angular.module('angular_starter').controller('HomeController', function($scope, $interval, $http) {});

angular.module('angular_starter').service('Example', function($q, $http) {
  var urlBase;
  urlBase = '';
  this.test = function() {
    var deferred;
    deferred = $q.defer();
    $http({
      url: urlBase + 'test',
      method: 'POST'
    }).then(function(data) {
      return deferred.resolve(data);
    }, function(data) {
      return deferred.reject(data);
    });
    return deferred.promise;
  };
  return this;
});
