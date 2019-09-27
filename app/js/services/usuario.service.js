(function () {
    'use strict';

    angular.module('app')
        .service('usuario', usuarioService);

    /**
     * Injetando dependencias
     **/

    usuarioService.$inject = ['APPService', '$cookies'];


/**
 * Definição dos funções
 **/

function usuarioService(APPService, $cookies) {

    var buscar = new APPService('usuario/buscar', 'GET', '', 'buscar usuarios', 1);
    var salvar = new APPService('usuario/salvar', 'POST', 'Usuário salvo com sucesso', 'salvar usuario', 2);
    var editar = new APPService('usuario/editar', 'PUT', 'Usuário editado com sucesso', 'editar usuario', 2);
    var deletar = new APPService('usuario/deletar', 'DELETE', 'Usuário excluído com sucesso', 'deletar usuario', 2);

    var servico = {
        buscar: function (parametros) {
            return buscar.call(parametros);
        },
        salvar: function (parametros) {
            return salvar.call(parametros);
        },
        editar: function (parametros) {
            return editar.call(parametros);
        },
        deletar: function (parametros) {
            return deletar.call(parametros);
        }
    };

    return servico;

}
})();
