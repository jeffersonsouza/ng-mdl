ngMdl.directive('mdlSpinner', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<div class="mdl-spinner mdl-js-spinner is-active" ng-class="ngClass" ng-model="ngModel"></div>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs) {
      $scope.ngClass = {
        'mdl-spinner--single-color': $attrs.singleColor
      };
    }
  };
}]);
