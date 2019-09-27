(function () {
    'use strict';

    /**
     * Definição dos controladores
     **/

    angular.module('app')
        .controller('listarUsuarioController', listarUsuarioController)
        .controller('cadastrarUsuarioController', cadastrarUsuarioController)
        .controller('editarUsuarioController', editarUsuarioController);

    /**
     * Injetando dependencias
     **/

    listarUsuarioController.$inject = ['$state', '$cookies', 'logger', '$uibModal', 'appConfig', 'usuario'];
    cadastrarUsuarioController.$inject = ['$state', '$cookies', 'logger', 'usuario'];
    editarUsuarioController.$inject = ['$state', '$cookies', 'logger', 'usuario', '$uibModalInstance', 'user'];

    /**
     * Definição dos funções
     **/

    function listarUsuarioController($state, $cookies, logger, $uibModal, appConfig, usuario) {

        var vm = this;

        /**
         *  Variáveis
         **/

        vm.abrirFiltro = abrirFiltro;
        vm.buscarUsuarios = buscarUsuarios;
        vm.editar = editar;
        vm.excluir = excluir;

        vm.usuarios = [];

        vm.mostrar = {
            filtro: true,
            tabela: false
        };

        vm.filtros = {
            nome: null,
            apelido: null,
            teste: null
        };

        activate();

        /////////////////

        function activate() {}

        function abrirFiltro() {
            return vm.mostrar.filtro = !vm.mostrar.filtro;
        }

        function buscarUsuarios() {
            var filtro = angular.copy(vm.filtros);
            vm.mostrar.filtro = false;
            
            // usuario.buscar(filtro).then(function (response) {
            //     vm.usuarios = response.data.result;
            //     vm.mostrar.tabela = true;
            // });

            vm.usuarios = [
                {
                    id: 1,
                    nome: "Leonardo",
                    apelido: "Mirosmar",
                    telefone: '(43)996070579'
                },
                {
                    id: 2,
                    nome: "Matheus",
                    apelido: "Jym",
                    telefone: '(42)999887766'
                }
            ];
            vm.mostrar.tabela = true;
        }

        function editar(user) {
            vm.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: appConfig.basePath + 'views/usuario/editar.html',
                controller: 'editarUsuarioController',
                controllerAs: 'vm',
                size: 'md',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });
            vm.modalInstance.result.then(function (result) {

            });
        }

        function excluir(usuario) {

        }
    }

    function cadastrarUsuarioController($state, $cookies, logger, usuario) {
        var vm = this;

        vm.salvar = salvar;

        vm.usuario = {
            nome: null,
            apelido: null,
            telefone: null,
            username: null,
            senha: null,
            repetir_senha: null
        }

        function salvar() {
            console.log(vm.usuario);
        }
    }


    function editarUsuarioController($state, $cookies, logger, usuario, $uibModalInstance, user) {
        var vm = this;

        vm.cancelar = cancelar;
        vm.ok = ok;

        vm.usuario = angular.copy(user);

        function cancelar() {
            $uibModalInstance.dismiss("");
        }

        function ok() {

        }
    }

})();
