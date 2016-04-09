ngMdl.directive('mdlUpgrade', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'A',
    compile: function() {
      return {
        post: function postLink(scope, element) {
          $timeout(function() {
            componentHandler.upgradeElements(element[0]);
          }, 0);
        }
      };
    },
  };
}]);
