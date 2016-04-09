ngMdl.directive('mdlCheckbox', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<label class="mdl-checkbox mdl-js-checkbox" ng-class="ngClass"><input type="checkbox" ng-model="ngModel" class="mdl-checkbox__input" /><span class="mdl-checkbox__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs){
      $scope.label = $attrs.label;
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect
      };
    }
  };
}]);
