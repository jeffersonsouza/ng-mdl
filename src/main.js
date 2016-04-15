var ngMdl = angular.module('ng.mdl', []);

ngMdl.run([function() {
  var head = angular.element(document.querySelector('head')),
    rippleStyle = '<style>.ripple{position:absolute;opacity:.5;filter:alpha(opacity=50);border-radius:100%;pointer-events:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}.ripple.show{-webkit-animation-name:ripple;animation-name:ripple;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes ripple{to{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0;filter:alpha(opacity=0)}}@keyframes ripple{to{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0;filter:alpha(opacity=0)}}</style>';

  head.append(rippleStyle);
}]);

ngMdl.provider('mdlConfig', [function() {
  var provider = this;

  this.floating = true;
  this.rippleEffect = true;

  provider.$get = function() {
    return provider;
  };
}]);
