
(function () {
    'use strict';

    angular.module('app')
        .directive('toggleNavCollapsedMin', ['$rootScope', ToggleNavCollapsedMin])
        .directive('collapseNav', ['$rootScope', CollapsedNav])
        .directive('highlightActive', HighlightActive)
        .directive('toggleOffCanvas', ToogleOffCanvas)
        .directive('slimScroll', slimScroll)
        .directive('searchNav', SearchNav)
        .directive('sidebarShow', SidebarShow)
        .directive('myRefresh', MyRefresh);

    function ToggleNavCollapsedMin($rootScope) {
    	var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var app;
            app = $('#app');
            $rootScope.collapsedMin = false;
            ele.on('click', function(e) {

                if (app.hasClass('nav-collapsed-min')) {
                    app.removeClass('nav-collapsed-min');
                    $rootScope.collapsedMin = false;
                } else {
                    app.addClass('nav-collapsed-min');
                    $rootScope.collapsedMin = true;
                    $rootScope.$broadcast('nav:reset');
                }
                return e.preventDefault();
            });
        }
    }

    function CollapsedNav($rootScope) {
    	var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            var $a, $aRest, $app, $lists, $listsRest, $nav, $window, Timer, prevWidth, slideTime, updateClass;

            slideTime = 250;

            $window = $(window);

            $lists = ele.find('ul').parent('li');

            //$lists.append('<i class="ti-angle-down icon-has-ul-h"></i><i class="ti-angle-right icon-has-ul"></i>');

            $a = $lists.children('a');

            $listsRest = ele.children('li').not($lists);

            $aRest = $listsRest.children('a');

            $app = $('#app');

            $rootScope.minLayout = false;

            $nav = $('#nav-container');

            $a.on('click', function(event) {
                var $parent, $this;
                if ($app.hasClass('nav-collapsed-min') || ($nav.hasClass('nav-horizontal') && $window.width() >= 768)) {
                    return false;
                }
                $this = $(this);
                $parent = $this.parent('li');
                $lists.not($parent).removeClass('open').find('ul').slideUp(slideTime);
                $parent.toggleClass('open').find('ul').stop().slideToggle(slideTime);
                event.preventDefault();
            });

            $aRest.on('click', function(event) {
                $lists.removeClass('open').find('ul').slideUp(slideTime);
            });

            scope.$on('nav:reset', function(event) {
                $lists.removeClass('open').find('ul').slideUp(slideTime);
            });

            Timer = void 0;

            prevWidth = $window.width();
            if (prevWidth < 768) {
                $rootScope.minLayout = true;
            }

            updateClass = function() {
                var currentWidth;
                currentWidth = $window.width();
                if (currentWidth < 768) {
                    $app.removeClass('nav-collapsed-min');
                }
                if (prevWidth < 768 && currentWidth >= 768 && $nav.hasClass('nav-horizontal')) {
                    $lists.removeClass('open').find('ul').slideUp(slideTime);
                }
                prevWidth = currentWidth;
            };

            $window.resize(function() {
                var t;
                clearTimeout(t);
                t = setTimeout(updateClass, 300);
            });

        }
    }

    function HighlightActive() {
    	var directive = {
            restrict: 'A',
            controller: [ '$scope', '$element', '$attrs', '$location', toggleNavCollapsedMinCtrl]
        };

        return directive;

        function toggleNavCollapsedMinCtrl($scope, $element, $attrs, $location) {
            var highlightActive, links, path;

            links = $element.find('a');

            path = function() {
                return $location.path();
            };

            if (links.length > 0) {
                var $parent, $this, $app, $window, $lists, slideTime;

                $lists = $element.find('ul').parent('li');
                slideTime = 250;
                $this = $(this);
                $parent = $this.parent('li');

                $lists.not($parent).removeClass('open').find('ul').slideUp(slideTime);
                $parent.toggleClass('open').find('ul').stop().slideToggle(slideTime);
                //event.preventDefault();
            }

            highlightActive = function(links, path) {
                path = '#' + path;
                return angular.forEach(links, function(link) {
                    var $li, $link, href;
                    $link = angular.element(link);
                    $li = $link.parent('li');
                    href = $link.attr('href');
                    if ($li.hasClass('active')) {
                        $li.removeClass('active');
                    }
                    if (path.indexOf(href) === 0) {
                        return $li.addClass('active');
                    }
                });
            };

            highlightActive(links, $location.path());

            $scope.$watch(path, function(newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }
                return highlightActive(links, $location.path());
            });

        }
    }

    function ToogleOffCanvas() {
    	var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {
            ele.on('click', function() {
                return $('#app').toggleClass('on-canvas');
            });
        }
    }

    function slimScroll() {
        return {
            restrict: 'A',
            link: function(scope, ele, attrs) {
                /*return ele.slimScroll({
                    height: attrs.scrollHeight || '100%'
                });*/
            }
        };
    }

    function SearchNav() {
    	var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link(scope, ele, attrs) {

            scope.$watch(attrs.ngModel, function(newVal, oldVal) {
                if (newVal != oldVal) {
                    var secoes = angular.element(ele).parent().parent().children('li');
                    angular.forEach(secoes, function(secao) {
                        if (newVal == null || newVal == "") {
                            angular.element(secao).removeClass('open').find('ul').slideUp(250);
                        }
                        else {
                            if (!angular.element(secao).hasClass('open')) {
                                angular.element(secao).removeClass('open').find('ul').slideUp(250);
                                angular.element(secao).toggleClass('open').find('ul').stop().slideToggle(250);
                            }
                        }
                    });
                }
            });
        }
    }

    function SidebarShow() {
        var directive = {
            restrict: 'A',
            controller: [ '$scope', '$element', '$attrs', '$location', sidebarShow]
        };

        return directive;

        function sidebarShow($scope, $element, $attrs, $location) {

            if ($location.path().includes("login")) {
                $element.removeClass("main-offset-sidebar");
            }
            else {
                $element.addClass("main-offset-sidebar");
            }

        }
    }

    function MyRefresh() {
        var directive = {
            restrict: 'A',
            controller: ['$scope', '$route', '$location', '$element', directiveController]
        };
        return directive;

        function directiveController($scope, $route, $location, $element) {
            $element.bind('click', function () {
                if ($element[0] && $element[0].href && $element[0].href === $location.absUrl()) {
                    $route.reload();
                }
            });
        }
    }

})();
