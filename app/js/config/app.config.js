(function () {
    'use strict';

    angular.module('app.config',[])
        .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = true;
            cfpLoadingBarProvider.latencyThreshold = 1;
        }])

        .run(['$rootScope', '$state', '$stateParams', '$transitions', 'login', '$cookies', '$window', function ($rootScope, $state, $stateParams, $transitions, login) {
            $transitions.onSuccess({}, function ($transition) {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                if (angular.equals($transition.$to().name, 'appSimple.login')) {
                    login.LogOut();
                }
            });

            $transitions.onBefore({to: 'app.**'}, function (trans) {
                // var myPerm = trans.injector().get('permissaoFactory');
                // myPerm.buscaPerms();
                // If isAuthenticated returns false, the transition is cancelled.
                return login.isLogged();
            });


            $rootScope.$state = $state;
            return $rootScope.$stateParams = $stateParams;
        }])

        .provider('appConfig', function () {
            var PROD = "";
            var DEV = "";

            var isDev = true;

            var config = {
                baseUrl: ((isDev) ? DEV : PROD) + "api/",
                fotoUrl: ((isDev) ? DEV : PROD),
                basePath: ((isDev) ? "app/" : "dist/"),
                horario_verao: false,
                debug: isDev,
                permissoes: []
            };

            return {
                config: config,
                $get: function () {
                    return config;
                }
            };

        })

        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }])

        .config(['$locationProvider', '$httpProvider', '$compileProvider', function ($locationProvider, $httpProvider, $compileProvider) {
            var imgSrcSanitizationWhitelist = /^\s*(https?|ftp|file|data|chrome-extension|blob):|data:image\//;
            $compileProvider.imgSrcSanitizationWhitelist(imgSrcSanitizationWhitelist);

            $locationProvider.hashPrefix('');

            $httpProvider.interceptors.push(function ($q, $location, $window, $cookies) {
                return {
                    "request": function (config) {

                        if (!config.url.includes("oauth/token") &&
                            !config.url.includes('maps.googleapis') &&
                            !config.url.includes('viacep')) {

                            var token = $cookies.getObject("token");
                            if (token != null) {
                                config.headers.Authorization = "Bearer " + token.access_token;
                            }
                        }

                        return config;
                    },
                    "response": function (response) {
                        return response;
                    },
                    "responseError": function (response) {
                        return $q.reject(response);
                    }
                };
            });
        }]);
})();
