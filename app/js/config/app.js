(function () {
    'use strict';

    angular
        .module('app', [
            'ncy-angular-breadcrumb',
            'angular-loading-bar',
            'ngCookies',
            'ngResource',
            'ngSanitize',
            'ngAnimate',
            'ui.router',
            'ui.bootstrap',

            'app.service',
            'app.config',
            'app.routes',

        ]);
})();
