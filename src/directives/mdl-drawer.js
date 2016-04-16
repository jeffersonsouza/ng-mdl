ngMdl.directive('mdlDrawer', ['mdlConfig', '$timeout', function(mdlConfig, $timeout) {
  return {
    restrict: 'E',
    require: '^?mdlNavigationLayout',
    replace: true,
    transclude: true,
    scope: {
      title: '@',
      items: '='
    },
    link: function(scope, ele, attrs, navLayoutCtrl) {
      var body = angular.element(document.body),
        obfuscator = angular.element(document.createElement('div')),
        navLinks;

      scope.openDrawer = function() {
        ele.addClass('is-visible');
        obfuscator.addClass('is-visible');
      };

      scope.closeDrawer = function() {
        ele.removeClass('is-visible');
        obfuscator.removeClass('is-visible');
      };

      $timeout(function() {
         navLinks = angular.element(ele[0].querySelectorAll('.mdl-navigation__link'));
         navLinks.on('click', scope.closeDrawer);
      });

      obfuscator.addClass('mdl-layout__obfuscator');
      obfuscator.on('click', scope.closeDrawer);
      body.append(obfuscator);

      scope.$on('drawerOpened', scope.openDrawer);
    },
    template: '<div class="mdl-layout__drawer">'+
      '<span class="mdl-layout-title">{{title}}</span>'+
      '<nav class="mdl-navigation">'+
        '<div ng-if="!items" ng-transclude></div>'+
        '<a ng-if="items" ng-click="closeDrawer()" class="mdl-navigation__link" href="{{item.href}}" ng-repeat="item in items track by $index">{{item.title}}</a>'+
      '</nav>'+
    '</div>'
  };
}]);
