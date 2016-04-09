ngMdl.directive('mdlNavigationLayout', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div class="mdl-layout mdl-js-layout {{classlist}}" ' +
      'ng-class="layoutClasses">' +
      '<header class="mdl-layout__header" ng-class="headerClasses" ng-show="showHeader">' +
      '<div class="mdl-layout__header-row">' +
      '<span class="mdl-layout-title">{{mdlHeaderTitle}}</span>' +
      '<div class="mdl-layout-spacer"></div>' +
      '<nav class="mdl-navigation">' +
      '<span ng-repeat="el in mdlHeaderItems">' +
      '<a class="mdl-navigation__link" ng-show="!el.download"' +
      'ng-href="{{el.href||\'\'}}" hreflang="{{el.hreflang||\'\'}}" media="{{el.media||\'\'}}" rel="{{el.rel||\'\'}}" shape="{{el.shape||\'\'}}" target="{{el.target||\'_self\'}}" type="{{el.type||\'text/html\'}}" ng-click="el.onclick()"' +
      '>{{el.text}}</a>' +
      '<a class="mdl-navigation__link" ng-show="!!el.download" download ng-href="{{el.href||\'\'}}">{{el.text}}</a>' +
      '</span>' +
      '</nav>' +
      '</div>' +
      '</header>' +
      '<div class="mdl-layout__drawer">' +
      '<span class="mdl-layout-title">{{mdlMenuTitle}}</span>' +
      '<nav class="mdl-navigation">' +
      '<span ng-repeat="el in mdlMenuItems">' +
      '<a class="mdl-navigation__link" ng-show="!el.download"' +
      'ng-href="{{el.href||\'\'}}" hreflang="{{el.hreflang||\'\'}}" media="{{el.media||\'\'}}" rel="{{el.rel||\'\'}}" shape="{{el.shape||\'\'}}" target="{{el.target||\'_self\'}}" type="{{el.type||\'text/html\'}}" ng-click="el.onclick()"' +
      '>{{el.text}}</a>' +
      '<a class="mdl-navigation__link" ng-show="!!el.download" download ng-href="{{el.href||\'\'}}">{{el.text}}</a>' +
      '</span>' +
      '</nav>' +
      '</div>' +
      '<main class="mdl-layout__content" ng-transclude>' +
      '</main>' +
      '</div>',
    scope: {
      'class': '@',
      mdlMenuItems: '=',
      mdlMenuTitle: '=',
      mdlHeaderItems: '=',
      mdlHeaderTitle: '=',
    },
    link: function($scope, el, $attrs) {
      $scope.classlist = $attrs['class'];
      $scope.mdlFixedDrawer = $attrs.mdlFixedDrawer;
      $scope.mdlHeaderTransparent = $attrs.mdlHeaderTransparent;
      $scope.mdlFixedHeader = $attrs.mdlFixedHeader;
      $scope.showHeader = !$attrs.mdlHeaderHidden;
      $scope.layoutClasses = {
        'mdl-layout--fixed-drawer': $attrs.mdlFixedDrawer
      };
      $scope.headerClasses = {
        'mdl-layout__header--transparent': $attrs.mdlHeaderTransparent,
        'mdl-layout--fixed-header': $attrs.mdlFixedHeader
      };
    }
  };
}]);
