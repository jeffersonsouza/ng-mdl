ngMdl.directive('mdlButton', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    require: '^?mdlRipple',
    template: '<button mdl-ripple="ripple" class="mdl-button" ng-class="ngClass" ng-disabled="ngDisabled" ng-transclude><i ng-if="type === \'fab\' || type === \'icon\' || type === \'mini-fab\'" class="material-icons">{{icon}}</i></button>',
    scope: {
      type: '@',
      icon: '@',
      ngModel: '=',
      ngDisabled: '=',
      ripple: '='
    },
    transclude: true,
    link: function(scope, ele, attrs) {

      scope.ripple = (angular.isDefined(scope.ripple)) ? scope.ripple : mdlConfig.rippleEffect;
      scope.ngClass = {
        'mdl-button--primary': attrs.theme === 'primary',
        'mdl-button--accent': attrs.theme === 'accent',
        'mdl-button--fab': scope.type === 'fab' || scope.type === 'mini-fab',
        'mdl-button--icon': scope.type === 'icon',
        'mdl-button--mini-fab': scope.type === 'mini-fab',
        'mdl-button--raised': scope.type === 'raised'
      };
    }
  };
}]);
