ngMdl.directive('mdlProgress', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<div id="p1" class="mdl-progress mdl-js-progress" ng-model="ngModel"></div>',
    scope: {
      ngModel: '='
    },
    transclude: true,
    link: function($scope, el, $attrs){
      $attrs.$observe('progress', function(progress){
        progress = parseInt(progress);
        if (progress){
          var child = el[0].childNodes[0];
          if (child.MaterialProgress){
            child.MaterialProgress.setProgress(progress);
          }else{
            child.addEventListener('mdl-componentupgraded', function(){
              child.MaterialProgress.setProgress(progress);
            });
          }
        }
      });
    }
  };
}]);
