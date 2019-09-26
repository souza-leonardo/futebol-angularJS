angular
    .module('app')
    .directive('a', navigationDirective)
    .directive('button', layoutToggleDirective)
    .directive('a', layoutToggleDirective)
    .directive('button', collapseMenuTogglerDirective)
    .directive('angularMarquee', angularMarquee)
    .directive('vMatch', vMatch)
    .directive('temPermissao', temPermissao);


vMatch.$inject = ['$parse'];
temPermissao.$inject = ['$rootScope', 'permissaoFactory', '$location'];

/**
 * @desc Genesis main navigation - Siedebar menu
 * @example <li class="nav-item nav-dropdown"></li>
 */
function navigationDirective() {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
            element.on('click', function () {
                if (!angular.element('body').hasClass('compact-nav')) {
                    element.parent().toggleClass('open').find('.open').removeClass('open');
                }
            });
        } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
            element.on('click', function () {
                element.parent().toggleClass('open').find('.open').removeClass('open');
            });
        }
    }
}

//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];

function sidebarNavDynamicResizeDirective($window, $timeout) {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {

        if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
            var bodyHeight = angular.element(window).height();
            scope.$watch(function () {
                var headerHeight = angular.element('header').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight);
                }
            });

            angular.element($window).bind('resize', function () {
                var bodyHeight = angular.element(window).height();
                var headerHeight = angular.element('header').outerHeight();
                var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
                var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

                if (angular.element('body').hasClass('sidebar-off-canvas')) {
                    element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
                } else {
                    element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
                }
            });
        }
    }
}

//LayoutToggle
layoutToggleDirective.$inject = ['$interval'];

function layoutToggleDirective($interval) {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function () {

            if (element.hasClass('sidebar-toggler')) {
                angular.element('body').toggleClass('sidebar-hidden');
            }

            if (element.hasClass('aside-menu-toggler')) {
                angular.element('body').toggleClass('aside-menu-hidden');
            }
        });
    }
}

//Collapse menu toggler
function collapseMenuTogglerDirective() {
    var directive = {
        restrict: 'E',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function () {
            if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
                angular.element('body').toggleClass('sidebar-mobile-show');
            }
        });
    }
}

function angularMarquee($timeout) {
    return {
        restrict: 'A',
        scope: true,
        compile: function (tElement, tAttrs) {
            if (tElement.children().length === 0) {
                tElement.append('<div>' + tElement.text() + '</div>');
            }
            var content = tElement.children();
            var $element = $(tElement);
            $(tElement).empty();
            tElement.append('<div class="angular-marquee" style="float:left;">' + content.clone()[0].outerHTML + '</div>');
            var $item = $element.find('.angular-marquee');
            $item.clone().css('display', 'none').appendTo($element);
            $element.wrapInner('<div style="width:100000px" class="angular-marquee-wrapper"></div>');
            return {
                post: function (scope, element, attrs) {
                    //direction, duration,
                    var $element = $(element);
                    var $item = $element.find('.angular-marquee:first');
                    var $marquee = $element.find('.angular-marquee-wrapper');
                    var $cloneItem = $element.find('.angular-marquee:last');
                    var duplicated = false;

                    var containerWidth = parseInt($element.width());
                    var itemWidth = parseInt($item.width());
                    var defaultOffset = 20;
                    var duration = 3000;
                    var scroll = false;
                    var animationCssName = '';

                    function calculateWidthAndHeight() {
                        containerWidth = parseInt($element.width());
                        itemWidth = parseInt($item.width());
                        if (itemWidth > containerWidth) {
                            duplicated = true;
                        } else {
                            duplicated = false;
                        }

                        if (duplicated) {
                            $cloneItem.show();
                        } else {
                            $cloneItem.hide();
                        }

                        $element.height($item.height());
                    }

                    function _objToString(obj) {
                        var tabjson = [];
                        for (var p in obj) {
                            if (obj.hasOwnProperty(p)) {
                                tabjson.push(p + ':' + obj[p]);
                            }
                        }
                        tabjson.push();
                        return '{' + tabjson.join(',') + '}';
                    }

                    function calculateAnimationDuration(newDuration) {
                        var result = (itemWidth + containerWidth) / containerWidth * newDuration / 1000;
                        if (duplicated) {
                            result = result / 2;
                        }
                        return result;
                    }

                    function getAnimationPrefix() {
                        var elm = document.body || document.createElement('div');
                        var domPrefixes = ['webkit', 'moz', 'O', 'ms', 'Khtml'];

                        for (var i = 0; i < domPrefixes.length; i++) {
                            if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                                var prefix = domPrefixes[i].toLowerCase();
                                return prefix;
                            }
                        }
                    }

                    function createKeyframe(number) {
                        var prefix = getAnimationPrefix();

                        var margin = itemWidth;
                        var keyframeString = '@-' + prefix + '-keyframes ' + 'simpleMarquee' + number;
                        var css = {
                            'margin-left': -(margin) + 'px'
                        };
                        var keyframeCss = keyframeString + '{ 100%' + _objToString(css) + '}';
                        var $styles = $('style');

                        //Now add the keyframe animation to the head
                        if ($styles.length !== 0) {
                            //Bug fixed for jQuery 1.3.x - Instead of using .last(), use following
                            $styles.filter(":last").append(keyframeCss);
                        } else {
                            $('head').append('<style>' + keyframeCss + '</style>');
                        }
                    }

                    function stopAnimation() {
                        $marquee.css('margin-left', 0);
                        if (animationCssName != '') {
                            $marquee.css(animationCssName, '');
                        }

                    }


                    function createAnimationCss(number) {
                        var time = calculateAnimationDuration(duration);
                        var prefix = getAnimationPrefix();
                        animationCssName = '-' + prefix + '-animation';
                        var cssValue = 'simpleMarquee' + number + ' ' + time + 's 0s linear infinite';
                        $marquee.css(animationCssName, cssValue);
                        if (duplicated) {
                            $marquee.css('margin-left', 0);
                        } else {
                            var margin = containerWidth + defaultOffset;
                            $marquee.css('margin-left', margin);
                        }
                    }

                    function animate() {
                        //create css style
                        //create keyframe
                        calculateWidthAndHeight();
                        var number = Math.floor(Math.random() * 1000000);
                        createKeyframe(number);
                        createAnimationCss(number);
                    }

                    scope.$watch(attrs.scroll, function (scrollAttrValue) {
                        scroll = scrollAttrValue;
                        recalculateMarquee();
                    });

                    function recalculateMarquee() {
                        if (scroll) {
                            animate();
                        } else {
                            stopAnimation();
                        }
                    }

                    var timer;
                    scope.$on('recalculateMarquee', function (event, data) {
                        console.log('receive recalculateMarquee event');
                        if (timer) {
                            $timeout.cancel(timer);
                        }
                        timer = $timeout(function () {
                            recalculateMarquee();
                        }, 500);

                    });

                    scope.$watch(attrs.duration, function (durationText) {
                        duration = parseInt(durationText);
                        if (scroll) {
                            animate();
                        }
                    });
                }
            };
        }
    };
}


function vMatch($parse) {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ngModel) {
            var originalModel = $parse(attrs.vMatch),
                secondModel = $parse(attrs.ngModel);

            // Watch for changes to this input
            scope.$watch(attrs.ngModel, function (newValue) {
                ngModel.$setValidity(attrs.name, newValue === originalModel(scope));
            });
            // Watch for changes to the value-matches model's value
            scope.$watch(attrs.vMatch, function (newValue) {
                ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
            });
        }
    };
}


function temPermissao($rootScope, permissaoFactory, $location) {
    return {
        link: function (scope, element, attrs) {
            if ($location.path() == '/login') {
                return;
            }

            $rootScope.$on('permissionsChanged', function (event, args) {
                toggleVisibilidade();
            });

            var value = attrs.temPermissao.trim();
            var notFlag = value[0] === '!';

            if (notFlag) {
                value = value.slice(1).trim();
            }

            function toggleVisibilidade() {
                permissaoFactory.temPermissao(value, function (temPermissao) {
                    if (temPermissao.permitir && !notFlag || !temPermissao.permitir && notFlag) {
                        element.show();
                    }
                    else {
                        element.hide();
                    }
                });
            }

            toggleVisibilidade();

        }
    };
}
