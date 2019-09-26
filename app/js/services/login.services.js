(function () {
    'use strict';

    angular.module('app')
        .service('login', LoginService);

    /**
     * Injetando dependencias
     **/

    LoginService.$inject = ['APPService', '$cookies'];


/**
 * Definição dos funções
 **/

function LoginService(APPService, $cookies) {

    var access_token = new APPService('oauth/token', 'POST', 'Login realizado com sucesso', 'realizar login', 2);
    var refresh_token = new APPService('login/refresh_token', 'POST', 'Login atualizado com sucesso', 'atualizar login', 2);
    var revoke_token = new APPService('login/revoke_token', 'PUT', 'Login revogado com sucesso', 'revogar login', 2);

    var servico = {
        access_token: function (parametros) {
            return access_token.call(parametros);
        },
        refresh_token: function (parametros) {
            return refresh_token.call(parametros);
        },
        revoke_token: function (parametros) {
            return revoke_token.call(parametros);
        },
        isLogged: function (parametros) {
            var token = $cookies.getObject("token");
            return token != null;
        },
        LogOut: function (parametros) {
            $cookies.remove("token");
            $cookies.remove("login");

        }
    };

    return servico;

}
})();
