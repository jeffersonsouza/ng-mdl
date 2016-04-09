ngMdl.directive('mdlTextArea', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<div class="mdl-textfield mdl-js-textfield" ng-class="ngClass"><textarea class="mdl-textfield__input" type="text" ng-model="ngModel"></textarea><label class="mdl-textfield__label">{{label}}</label></div>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs){
      $scope.label = $attrs.label;
      $scope.ngClass = {
        'mdl-textfield--floating-label': mdlConfig.floating
      }
    }
  };
}]);
