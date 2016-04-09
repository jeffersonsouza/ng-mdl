ngMdl.directive('mdlRadio', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<label class="mdl-radio mdl-js-radio" ng-class="ngClass"><input type="radio" ng-model="ngModel" class="mdl-radio__button" name="options" value="{{value}}" /><span class="mdl-radio__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs) {
      $scope.label = $attrs.label;
      $scope.value = $attrs.value;
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect
      };
    }
  };
}]);
