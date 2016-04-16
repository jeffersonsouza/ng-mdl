var ngMdl = angular.module('ng.mdl', []);

ngMdl.run([function() {
  var head = angular.element(document.querySelector('head')),
    rippleStyle = '<style>.ripple{position:absolute;opacity:.5;filter:alpha(opacity=50);border-radius:100%;pointer-events:none;-webkit-transform:scale(0);-ms-transform:scale(0);transform:scale(0)}.ripple.show{-webkit-animation-name:ripple;animation-name:ripple;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes ripple{to{-webkit-transform:scale(1.5);transform:scale(1.5);opacity:0;filter:alpha(opacity=0)}}@keyframes ripple{to{-webkit-transform:scale(2.5);transform:scale(2.5);opacity:0;filter:alpha(opacity=0)}}</style>';

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

ngMdl.directive('mdlButton', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    require: '^?mdlRipple',
    template: '<button mdl-ripple="ripple" class="mdl-button" ng-class="ngClass" ng-disabled="ngDisabled" ng-transclude><i ng-if="type === \'fab\' || type === \'icon\' || type === \'mini-fab\'" class="material-icons">{{icon}}</i></button>',
    scope: {
      type: '@',
      icon: '@',
      ngModel: '=',
      ngDisabled: '=',
      ripple: '='
    },
    transclude: true,
    link: function(scope, ele, attrs) {

      scope.ripple = (angular.isDefined(scope.ripple)) ? scope.ripple : mdlConfig.rippleEffect;
      scope.ngClass = {
        'mdl-button--primary': attrs.theme === 'primary',
        'mdl-button--accent': attrs.theme === 'accent',
        'mdl-button--fab': scope.type === 'fab' || scope.type === 'mini-fab',
        'mdl-button--icon': scope.type === 'icon',
        'mdl-button--mini-fab': scope.type === 'mini-fab',
        'mdl-button--raised': scope.type === 'raised'
      };
    }
  };
}]);

ngMdl.directive('mdlCheckbox', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<label class="mdl-checkbox mdl-js-checkbox" ng-class="ngClass"><input type="checkbox" ng-model="ngModel" class="mdl-checkbox__input" /><span class="mdl-checkbox__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs){
      $scope.label = $attrs.label;
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect
      };
    }
  };
}]);

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

ngMdl.directive('mdlNavigationLayout', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'EAC',
    transclude: true,
    replace: true,
    scope: {
      title: '@'
    },
    controller: ['$scope', function($scope) {
      $scope.openDrawer = this.openDrawer = function() {
        $scope.$broadcast('drawerOpened');
      };
    }],
    link: function(scope, ele, attrs, ctrl, transclude) {
      ele.append(transclude());

      scope.showHeader = angular.isUndefined(attrs.headerHidden);

      // Drawer hamburger button
      scope.hasDrawer = angular.isDefined(attrs.hasDrawer);

      scope.layoutClasses = {
        'mdl-layout--fixed-drawer': scope.hasDrawer && angular.isDefined(attrs.fixedDrawer)
      };
    },
    template: '<div class="mdl-layout mdl-layout--fixed-header" ng-class="layoutClasses">'+
        '<header class="mdl-layout__header" ng-show="showHeader">'+
          '<div ng-if="hasDrawer" ng-click="openDrawer()" role="button" tabindex="0" class="mdl-layout__drawer-button"><i class="material-icons">menu</i></div>'+
          '<div class="mdl-layout__header-row">'+
            '<span class="mdl-layout-title">{{title}}</span>'+
          '</div>'+
        '</header>'+
      '</div>'
  };
}]);

/*ngMdl.directive('mdlNavigationLayout', ['mdlConfig', function(mdlConfig) {
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
}]);*/

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

ngMdl.directive('mdlRadio', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<label class="mdl-radio mdl-js-radio" ng-class="ngClass"><input type="radio" ng-model="ngModel" class="mdl-radio__button" name="options" value="{{value}}" /><span class="mdl-radio__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs) {
      $scope.label = $attrs.label;
      $scope.value = $attrs.value;
      $scope.ngClass = {
        'mdl-js-ripple-effect': mdlConfig.rippleEffect
      };
    }
  };
}]);

ngMdl.directive('mdlRipple', ['mdlConfig', '$timeout', function(mdlConfig, $timeout) {
  return {
    restrict: 'AC',
    link: function(scope, ele, attrs) {
      var rect, ripple, top, left, color, wh;

			ele.css({
				overflow: 'hidden',
				position: 'relative',
        transform: 'translateZ(0)'
			});

			ele.on('click', function(event) {
        var target = (event.target.nodeName === 'I') ? event.target.parentNode : event.target;

        if (scope.ripple) {
          rect = target.getBoundingClientRect();
  				ripple = angular.element(ele[0].querySelector('.ripple'));

          if (ripple.length === 0 || !ripple.hasClass('ripple')) {
  					wh = Math.max(rect.width, rect.height);
  					ripple = angular.element(document.createElement('span'));
  					ripple.addClass('ripple');
  					ripple.css({
  						width: wh + 'px',
  						height: wh + 'px'
  					});
  					ele.append(ripple);
  				}

          ripple.removeClass('show');
  				top = event.offsetY - ripple[0].clientHeight / 2;
  				left = event.offsetX - ripple[0].clientWidth / 2;
  				color = getComputedStyle(ele[0]).color;
  				ripple.css({
  				  top: top + 'px',
  				  left: left + 'px',
  					background: color
  				});
  				ripple.addClass('show');
        }
			});
		}
  };
}]);

ngMdl.directive('mdlSpinner', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    template: '<div class="mdl-spinner mdl-js-spinner is-active" ng-class="ngClass" ng-model="ngModel"></div>',
    scope: {
      ngModel: '='
    },
    link: function($scope, el, $attrs) {
      $scope.ngClass = {
        'mdl-spinner--single-color': $attrs.singleColor
      };
    }
  };
}]);

ngMdl.directive('mdlSwitch', ['mdlConfig', function(mdlConfig) {
  return {
    restrict: 'E',
    replace: true,
    template: '<label class="mdl-switch is-upgraded" ng-class="ngClass"><input type="checkbox" ng-model="ngModel" class="mdl-switch__input" ng-checked="ngModel" /><span class="mdl-switch__label">{{label}}</span></label>',
    scope: {
      ngModel: '='
    },
    link: function(scope, ele, attrs) {
      var switchTrack = angular.element(document.createElement('span')),
        switchThumb = angular.element(document.createElement('span')),
        checkbox = ele.find('input');

      switchTrack.addClass('mdl-switch__track');
      switchThumb.addClass('mdl-switch__thumb');

      ele.append(switchTrack);
      ele.append(switchThumb);

      scope.label = attrs.label;

      toggleSwitch(scope.ngModel);

      checkbox.on('change', function() {
        toggleSwitch(this.checked);
      });


      function toggleSwitch(bool) {
        if (bool) {
          ele.addClass('is-checked');
        } else {
          ele.removeClass('is-checked');
        }
      }


    }
  };
}]);

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
