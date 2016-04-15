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
