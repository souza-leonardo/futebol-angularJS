(function () {
    'use strict';

    /**
     * Definição dos controladores
     **/

    angular.module('app')
        .controller('loginController', loginController);

    /**
     * Injetando dependencias
     **/

    loginController.$inject = ['$rootScope', '$scope', '$state', '$cookies', 'logger', 'login'];

    /**
     * Definição dos funções
     **/

    function loginController($rootScope, $scope, $state, $cookies, logger, login) {

        var vm = this;

        /**
         *  Variáveis
         **/


        vm.credenciais = {
            "client_id": "2",
            "client_secret": "",
            "grant_type": "password",
            "username": '',
            "password": ''
        };

        vm.logar = logar;
        vm.sair = sair;

        function logar() {
            var obj = angular.copy(vm.credenciais);

            login.access_token(obj).then(function (response) {
                $cookies.putObject("login", $scope.credenciais);
                $cookies.putObject("token", response.data);
                $state.go('app.main');
                $rootScope.$broadcast("login");
                $rootScope.$broadcast("permissionsChanged");

            }).catch(function (response) {
                console.log(response);
                logger.error('Erro ao efetuar login.');
            });

        }

        function sair() {
            login.LogOut();
            $state.go('appSimple.login');
        }


    }


})();
