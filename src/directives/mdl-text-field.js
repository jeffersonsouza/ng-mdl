ngMdl.directive('mdlTextField', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<div class="mdl-textfield mdl-js-textfield" ng-class="ngClass"><input class="mdl-textfield__input" type="{{type}}" ng-model="ngModel" /><label class="mdl-textfield__label">{{label}}</label></div>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs){
      $scope.label = $attrs.label;
      $scope.type = $attrs.type ? $attrs.type : 'text';
      $scope.ngClass = {
        'mdl-textfield--floating-label': mdlConfig.floating
      };
    }
  };
}]);
