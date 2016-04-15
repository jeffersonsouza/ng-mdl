ngMdl.directive('mdlFixedHeader', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'A',
    scope: {},
    link: function(scope, ele, attrs){
      ele.css({
        display: 'block',
        position: 'fixed'
      });

      ele.next().css({
        marginTop: '60px'
      });
    }
  };
}]);
