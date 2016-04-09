ngMdl.directive('mdlButton', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<button class="mdl-button mdl-js-button" ng-class="ngClass" ng-disabled="ngDisabled" ng-transclude></button>',
    scope: {
      ngModel: '=',
      ngDisabled: '='
    },
    transclude: true,
    link: function($scope, el, $attrs) {
      el.css('display', 'inline-block');
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect,
        'mdl-button--primary': $attrs.theme === 'primary',
        'mdl-button--accent': $attrs.theme === 'accent'
      };
    }
  };
}]);
