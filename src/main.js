var ngMdl = angular.module('ng.mdl', []);

ngMdl.provider('mdlConfig', [function() {
  var provider = this;

  this.floating = true;
  this.rippleEffect = true;

  provider.$get = function() {
    return provider;
  };
}]);
