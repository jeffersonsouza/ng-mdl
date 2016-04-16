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
