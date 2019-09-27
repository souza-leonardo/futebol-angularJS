angular
    .module('app.routes', [])
    .config(['$stateProvider', '$urlRouterProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $breadcrumbProvider) {

        $urlRouterProvider.otherwise('/login');

        $breadcrumbProvider.setOptions({
            prefixStateName: 'app.main',
            includeAbstract: true,
            template: '<nav aria-label="breadcrumb"><ol class="breadcrumb"><li ng-repeat="step in steps | limitTo:(steps.length-1)" class="breadcrumb-item"><a ui-sref="{{step.ncyBreadcrumbStateRef}}"> {{ step.ncyBreadcrumbLabel }} </a></li><li ng-repeat="step in steps | limitTo:-1" class="breadcrumb-item"><a> {{ step.ncyBreadcrumbLabel }} </a></li></ol></nav>'
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


            //usuario
            .state('app.usuario', {
                url: '/jogador',
                abstract: true,
                ncyBreadcrumb: {label: 'Jogador'}
            })
            .state('app.usuario.listar', {
                url: '/listar',
                ncyBreadcrumb: {label: 'Listar'},
                templateUrl: 'app/views/usuario/listar.html',
                controller: 'listarUsuarioController',
                controllerAs: 'vm',
            })
            .state('app.usuario.cadastrar', {
                url: '/cadastrar',
                templateUrl: 'app/views/usuario/novo.html',
                ncyBreadcrumb: {label: 'Cadastrar'},
                controller: 'cadastrarUsuarioController',
                controllerAs: 'vm'
            })
            .state('app.usuario.editar', {
                url: '/:id/editar',
                templateUrl: 'app/views/usuario/editar.html',
                ncyBreadcrumb: {label: 'Editar'},
                controller: 'editarUsuarioController',
                controllerAs: 'vm'
            })

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
