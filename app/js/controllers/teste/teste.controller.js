(function () {
    'use strict';

    /**
     * Definição dos controladores
     **/

    angular.module('app')
        .controller('testeController', testeController);

    /**
     * Injetando dependencias
     **/

    testeController.$inject = ['$state'];

    /**
     * Definição dos funções
     **/

    function testeController($state) {

        var vm = this;

        /**
         *  Variáveis
         **/


        vm.controle = {
            tabela: {
                mostrar: false
            },
            accordion: {
                isOpen: true
            }
        };

        vm.testea = 'AAAAAAA';
        vm.testeb = 'BBBBBBB';

        vm.lista = [
            {
                "_id": "5d780609de4a3bd71897b619",
                "isActive": false,
                "balance": "3731.35",
                "name": "Bessie Case"
            },
            {
                "_id": "5d780609685f3efe4b1062c8",
                "isActive": true,
                "balance": "153118",
                "name": "Carla Sullivan"
            },
            {
                "_id": "5d780609118c6e878d05b2fc",
                "isActive": false,
                "balance": "3133.57",
                "name": "Marissa Mcclain"
            },
            {
                "_id": "5d7806097c40223fab500169",
                "isActive": true,
                "balance": "1727.04",
                "name": "Atkins Gates"
            },
            {
                "_id": "5d780609047cdf7204fa90cd",
                "isActive": false,
                "balance": "1290.05",
                "name": "Deborah Carney"
            }
        ];

        vm.resultadoBuscaPaginada = {
            data: []
        };

        vm.buscar = buscar;


        activate();


        function activate() {
            //TODO
        }

        function buscar() {

            vm.resultadoBuscaPaginada.data = vm.lista;
            vm.controle.tabela.mostrar = true;
            vm.controle.accordion.isOpen = false;
        }


    }


})();
