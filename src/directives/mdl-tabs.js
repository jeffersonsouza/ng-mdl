ngMdl.directive('mdlTabs', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="mdl-tabs mdl-js-tabs mdl-js-ripple-effect"><div class="mdl-tabs__tab-bar"><a class="mdl-tabs__tab" ng-class="{\'is-active\': pane.selected}" ng-repeat="pane in panes" ng-click="select(pane)">{{pane.title}}</a></div><ng-transclude /></div>',
    scope: {},
    controller: ['$scope', function($scope){
      var panes = this.panes = $scope.panes = [];

      $scope.select = this.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
        $scope.$broadcast('paneChange', pane.$id);
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    }]
  };
}])
.directive('mdlPane', ['mdlConfig', function(mdlConfig) {
  return {
    require: '^^mdlTabs',
    restrict: 'E',
    replace: true,
    transclude: true,
    template: '<div class="mdl-tabs__panel" ng-transclude></div>',
    scope: {
      title: '@'
    },
    link: function(scope, el, $attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);

      scope.$on('paneChange', function(e, id) {
        if (scope.$id == id) {
          el.addClass('is-active');
        } else {
          el.removeClass('is-active');
        }
      });

      scope.isSelected = function() {
        return scope.selected;
      };
    }
  };
}]);
