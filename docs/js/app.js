angular.module('app', ['ui.router', 'hljs' ,'ng.mdl'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('overview', {
      url: '/',
      templateUrl: 'tpls/overview.html'
    })
    .state('install', {
      url: '/install',
      templateUrl: 'tpls/install.html'
    })
    .state('components', {
      url: '/components',
      template: '<h2 id="components">Components</h2><section class="mdl-grid" ui-view></section>'
    })
    .state('components.buttons', {
      url: '/buttons',
      templateUrl: 'tpls/components/buttons.html'
    });

}])

.controller('demoCtrl', ['$scope', function($scope) {

  $scope.toggleSubMenu = function(event) {
    var target = angular.element(event.target),
      subMenu = target.parent().find('ul');
      
    subMenu.toggleClass('is-visible');
  };

}]);
