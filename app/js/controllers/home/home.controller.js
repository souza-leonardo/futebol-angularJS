(function () {
    'use strict';

    /**
     * Definição dos controladores
     **/

    angular.module('app')
        .controller('homeController', homeController);

    /**
     * Injetando dependencias
     **/

    homeController.$inject = ['$state'];

    /**
     * Definição dos funções
     **/

    function homeController($state) {

        var vm = this;

        /**
         *  Variáveis
         **/


        activate();


        function activate() {
            //TODO
        }
    }


})();
