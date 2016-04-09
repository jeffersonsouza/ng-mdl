ngMdl.directive('mdlSwitch', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<label class="mdl-switch mdl-js-switch" ng-class="ngClass"><input type="checkbox" ng-model="ngModel" class="mdl-switch__input" ng-checked="ngModel" /><span class="mdl-switch__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs) {
      $scope.label = $attrs.label;
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect
      };
      $scope.$watch(function() {
        return $scope.ngModel;
      }, function(newValue) {
        if (!el[0].childNodes[0] || !el[0].childNodes[0].MaterialSwitch) {
          return false;
        }

        if (newValue) {
          el[0].childNodes[0].MaterialSwitch.on();
        } else {
          el[0].childNodes[0].MaterialSwitch.off();
        }
      });
    }
  };
}]);
