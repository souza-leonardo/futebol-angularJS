angular
    .module('app.routes', [])
    .config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $breadcrumbProvider) {

        $urlRouterProvider.otherwise('/login');

        $breadcrumbProvider.setOptions({
            prefixStateName: 'app.main',
            includeAbstract: true,
            template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
        });

        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app/views/common/layouts/full.html',
                //page title goes here
                ncyBreadcrumb: {label: 'Inicio', skip: true},
                controller: 'homeController'
            })
            .state('app.main', {
                url: '/main',
                templateUrl: 'app/views/home.html',
                ncyBreadcrumb: {label: 'Home',},
                controller: 'homeController',
                controllerAs: 'vm'

            })


            //desenvolvimento

            //solicitações
            .state('app.teste', {
                url: '/teste',
                abstract: true,
                ncyBreadcrumb: {label: 'Testando'},
                templateUrl: 'app/views/teste/cadastrar.html',
                controller: 'testeController',
                controllerAs: 'vm',
            })
            .state('app.teste.listar', {
                url: '/listar',
                ncyBreadcrumb: {label: 'Listar'},
                views: {
                    't1': {
                        templateUrl: 'app/views/teste/listar.html',
                        controller: 'testeController',
                        controllerAs: 'vm'
                    },
                    't2': {}
                }
            })
            .state('app.teste.cadastrar', {
                url: '/cadastrar',
                ncyBreadcrumb: {label: 'Cadastrar'},
                views: {
                    't1@app.teste': {
                        templateUrl: 'app/views/teste/a.html',
                    },
                    't2@app.teste': {
                        templateUrl: 'app/views/teste/b.html',
                    }
                }
            })
            .state('app.teste.editar', {
                url: '/:id/editar',
                templateUrl: 'app/views/teste/cadastrar.html',
                ncyBreadcrumb: {label: 'Editar'},
                controller: 'testeController',
                controllerAs: 'vm'
            })
            .state('app.teste.gerenciar', {
                url: '/:id/gerenciar',
                templateUrl: 'app/views/teste/gerenciar.html',
                ncyBreadcrumb: {label: 'Gerenciar'},
                controller: 'testeController',
                controllerAs: 'vm'
            })

            //páginas "deslogado"
            .state('appSimple', {
                abstract: true,
                templateUrl: 'app/views/common/layouts/simple.html'
            })

            // Additional Pages
            .state('appSimple.login', {
                url: '/login',
                templateUrl: 'app/views/pages/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .state('appSimple.register', {
                url: '/register',
                templateUrl: 'app/views/pages/register.html'
            })
            .state('appSimple.404', {
                url: '/404',
                templateUrl: 'app/views/pages/404.html'
            })
            .state('appSimple.500', {
                url: '/500',
                templateUrl: 'app/views/pages/500.html'
            });

    }]);
