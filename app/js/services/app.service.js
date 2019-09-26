(function () {
    'use strict';

    angular.module('app.service',[])
        .service('logger', LoggerService)
        .factory('APPService', APPServiceFactory)
        .factory('debounce', DebounceFactory);

    /**
     * Injetando dependencias
     **/

    LoggerService.$inject = [];
    APPServiceFactory.$inject = ['$rootScope', '$http', '$httpParamSerializer', 'logger', 'appConfig', '$q'];
    DebounceFactory.$inject = ['$timeout', '$q'];

    /**
     * Definição dos funções
     **/

    function LoggerService() {
        var logIt;
        // toastr setting.
        toastr.options = {
            "progressBar": true,
            "closeButton": true,
            "positionClass": "toast-top-center",
            "timeOut": "5000",
            "preventDuplicates": true
        };
        logIt = function (message, type) {
            return toastr[type](message);
        };
        return {
            info: function (message) {
                logIt(message, 'info');
            },
            warning: function (message) {
                logIt(message, 'warning');
            },
            success: function (message) {
                logIt(message, 'success');
            },
            error: function (message) {
                logIt(message, 'error');
            }
        };
    }


    function APPServiceFactory($rootScope, $http, $httpParamSerializer, $logger, appConfig, $q) {

        class APPService {
            constructor(url, metodo, mensagem_sucesso, mensagem_erro, tipo_erro, silent, timeout) {
                this._url = appConfig.baseUrl + url;
                this._metodo = metodo;
                this._mensagem_sucesso = mensagem_sucesso;
                this._mensagem_erro = mensagem_erro;
                this._tipo_erro = tipo_erro;
                this._silent = (silent == null) ? false : silent;
                this._timeout = (timeout == null) ? 0 : timeout;
                this._max_tentativas = 1;
            }

            get url() {
                return this._url;
            }

            get metodo() {
                return this._metodo;
            }

            get mensagem_sucesso() {
                return this._mensagem_sucesso;
            }

            get mensagem_erro() {
                return this._mensagem_erro;
            }

            get tipo_erro() {
                return this._tipo_erro;
            }

            get silent() {
                return this._silent;
            }

            get max_tentativas() {
                return this._max_tentativas;
            }

            get timeout() {
                return this._timeout;
            }

            set url(valor) {
                this._url = valor;
            }

            set metodo(valor) {
                this._metodo = valor;
            }

            set mensagem_sucesso(valor) {
                this._mensagem_sucesso = valor;
            }

            set mensagem_erro(valor) {
                this._mensagem_erro = valor;
            }

            set tipo_erro(valor) {
                this._tipo_erro = valor;
            }

            set silent(valor) {
                this._silent = valor;
            }

            set max_tentativas(valor) {
                this._max_tentativas = valor;
            }

            set timeout(valor) {
                this._timeout = valor;
            }

            call(parametros) {
                var timeout = this._timeout;

                if (!this._silent) {
                    $rootScope.$broadcast("add-requisicao");
                }
                var getPromise = function (parametros, url, metodo, timeout) {
                    parametros = (parametros == null) ? {} : parametros;
                    if (url.includes("{0}")) {
                        if (parametros.id == null) {
                            return;
                        } else {
                            url = url.replace("{0}", parametros.id);
                        }
                    }
                    var par = $httpParamSerializer(parametros);

                    switch (metodo) {

                        case "GET":
                            return $http.get(url + "?" + ((par.search('page')) == -1 ? par + "&page=1" : par), {timeout: timeout});
                        case "POST":
                            return $http.post(url, parametros, {timeout: timeout});
                        case "PUT":
                            return $http.put(url, parametros, {timeout: timeout});
                        case "DELETE":
                            return $http.delete(url, parametros, {timeout: timeout});
                        case "FILE":
                            var fd = new FormData();
                            angular.forEach(parametros, function (val, key) {
                                fd.append(key, val);
                            });
                            var options = {
                                timeout: timeout,
                                transformRequest: angular.identity,
                                headers: {'Content-Type': undefined}
                            };
                            return $http.post(url, fd, options);
                        case "MASSDELETE":
                            return $http.delete(url + "?codigo=" + parametros, {timeout: timeout});
                        case "DELCOP":
                            return $http.delete(url, {
                                headers: {'Content-Type': 'application/json;charset=utf-8'},
                                data: parametros
                            }, {timeout: timeout});
                        case "DOWN":
                            return $http.get(url + "?" + $httpParamSerializer(parametros), {responseType: 'arraybuffer'}, {timeout: timeout});
                        case "DELARQ":
                            return $http.delete(url + parametros, {timeout: timeout});
                        case "NEXT":
                            return $http.get(parametros, {timeout: timeout});
                        case "DEL":
                            return $http.delete(url + "/" + parametros.id, {timeout: timeout});
                        case "VIEWIMG":
                            return $http.get(url,{
                                headers: {
                                    'Content-Type': 'image/jpg'
                                },
                                responseType: 'blob'
                            });
                        default:
                            return $http.get(url + "?" + $httpParamSerializer(parametros), {timeout: timeout});
                    }
                };

                var handleHttpException = function (response, mensagem_erro, tipo_erro) {
                    var mensagem = "Não foi possível " + mensagem_erro;
                    if (tipo_erro == 2) {
                        mensagem = mensagem + ". Motivo: ";
                        if (response.data == null) {
                            mensagem = mensagem + response.message;
                        } else {
                            try {
                                Object.getOwnPropertyNames(response.data.errors).forEach(function (val) {
                                    mensagem = mensagem + response.data.errors[val][0] + "\n";
                                });
                            } catch (error) {
                                mensagem = mensagem + response.data.message;
                            }
                        }
                    } else if (tipo_erro == 3) {
                        if (response == null || response.data == null) {
                            mensagem = mensagem + response.message;
                        } else {
                            mensagem = mensagem + ". Motivo: " + response.data.message;
                        }
                    } else if (tipo_erro == 4) {
                        mensagem = "Uma falha inesperada ocorreu. Logo nossos servidores estarão de volta para melhor atendê-los"
                    }

                    mensagem = mensagem + ".";

                    $logger.error(mensagem);
                    console.log(response.data);

                    return $q.reject(response);
                };

                var makeCall = function (url, metodo, parametros, timeout, mensagem_sucesso, mensagem_erro, tipo_erro, getPromise, handleHttpException, silent, max_tentativas) {
                    timeout = timeout + 30000;

                    return getPromise(parametros, url, metodo, timeout).then(
                        function (response) {
                            if (response == undefined) {
                                if (max_tentativas == 0) {
                                    if (!silent) {
                                        $rootScope.$broadcast("success-requisicao");
                                    }
                                    return handleHttpException(response, mensagem_erro, 4);
                                }
                                return makeCall(url, metodo, parametros, timeout, mensagem_sucesso, mensagem_erro, tipo_erro, getPromise, handleHttpException, silent, max_tentativas - 1);
                            } else if (response.data.key >= 400) {
                                return handleHttpException(response, mensagem_erro, 3);
                            } else if (metodo != "GET" && response.data.key == 204) {
                                return handleHttpException(response, mensagem_erro, 3);
                            } else if (metodo != "GET" && mensagem_sucesso != "") {
                                $logger.success(mensagem_sucesso)
                            }
                            if (!silent) {
                                $rootScope.$broadcast("success-requisicao");
                            }
                            return response;
                        },
                        function (response) {
                            if (response.status == -1) {
                                if (max_tentativas == 0) {
                                    if (!silent) {
                                        $rootScope.$broadcast("success-requisicao");
                                    }
                                    return handleHttpException(response, mensagem_erro, 4);
                                }
                                return makeCall(url, metodo, parametros, timeout, mensagem_sucesso, mensagem_erro, tipo_erro, getPromise, handleHttpException, silent, max_tentativas - 1);
                            }
                            if (!silent) {
                                $rootScope.$broadcast("success-requisicao");
                            }
                            return handleHttpException(response, mensagem_erro, tipo_erro);
                        }
                    );
                };

                return makeCall(this.url, this.metodo, parametros, timeout, this.mensagem_sucesso, this.mensagem_erro, this.tipo_erro, getPromise, handleHttpException, this.silent, this.max_tentativas);
            }
        }

        return APPService;
    }


    function DebounceFactory($timeout, $q) {
        // The service is actually this function, which we call with the func
        // that should be debounced and how long to wait in between calls
        return function debounce(func, wait, immediate) {
            var timeout;
            // Create a deferred object that will be resolved when we need to
            // actually call the func
            var deferred = $q.defer();
            return function () {
                var context = this, args = arguments;
                var later = function () {
                    timeout = null;
                    if (!immediate) {
                        deferred.resolve(func.apply(context, args));
                        deferred = $q.defer();
                    }
                };
                var callNow = immediate && !timeout;
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(later, wait);
                if (callNow) {
                    deferred.resolve(func.apply(context, args));
                    deferred = $q.defer();
                }
                return deferred.promise;
            };
        };
    };
})();
