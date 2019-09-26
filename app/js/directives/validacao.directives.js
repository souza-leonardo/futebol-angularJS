(function () {
    'use strict';

    angular.module('app')
        .directive('validate', Validate)
        .directive('pwCheck', pwCheck);

})();

function pwCheck() {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var firstPassword = '#' + attrs.pwCheck;
            elem.add(firstPassword).on('keyup', function () {
                scope.$apply(function () {
                    var v = elem.val() === $(firstPassword).val();
                    ctrl.$setValidity('pwmatch', v);
                });
            });
        }
    };
}

function Validate() {
    return {
        link: function (scope, element, attrs) {

            if (attrs.mandatory != undefined) {
                label = element.find("label");
                label.text(label.text() + " *");
            }

            scope.$watch(attrs.validate, function (value) {
                if (!isPristine(element, value)) {

                    var erro = false;
                    var errors = [
                        Mandatory(value, element, attrs),
                        MinLength(value, element, attrs),
                        MaxLength(value, element, attrs),
                        Email(value, element, attrs),
                        CPF(value, element, attrs),
                        CNPJ(value, element, attrs),
                        Confirmar(value, element, attrs)
                    ];

                    for (var i = 0; i < errors.length; i++) {
                        if (errors[i]) {
                            erro = true;
                            break;
                        }
                    }

                    if (erro) {
                        if (element.hasClass('has-success')) {
                            element.removeClass('has-success');
                        }
                        element.addClass('has-error');
                    }
                    else {
                        if (element.hasClass('has-error')) {
                            element.removeClass('has-error');
                        }
                        element.addClass('has-success');
                    }
                }
            }, true);
        }
    };
}

function isPristine(element, value) {
    var ele = element.find('input');

    if (ele.length == 0) {
        ele = element.find('select');
    }

    return ele.hasClass("ng-pristine") && value == null;
}

function find(element, id) {
    var ele = element.find("#" + id);
    return (ele.length > 0) ? ele[0] : null;
}

function Mandatory(value, element, attrs, error) {

    function isMandatory(attrs) {
        return attrs.mandatory != undefined;
    }

    if (isMandatory(attrs)) {
        var p = find(element, "mandatory");
        if (value == null || value.length == 0) {
            element.append("<p id='mandatory' class='motive'> Campo Obrigatório </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }
    return false;
}

function MinLength(value, element, attrs, error) {

    function isMinLength(attrs) {
        return attrs.minLength != undefined;
    }

    if (isMinLength(attrs)) {
        var p = find(element, "minLength");
        var minLength = parseInt(attrs.minLength);
        if ((value != null || value == "") && (value.length < minLength)) {
            if (!p) element.append("<p id='minLength' class='motive'> Necessário " + minLength + " Dígitos </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }
    return false;

}

function MaxLength(value, element, attrs, error) {

    function isMaxLength(attrs) {
        return attrs.maxLength != undefined;
    }

    if (isMaxLength(attrs)) {
        var p = find(element, "maxLength");
        var maxLength = parseInt(attrs.maxLength);
        if ((value != null || value == "") && (value.length < maxLength)) {
            if (!p) element.append("<p id='maxLength' class='motive'> Necessário " + maxLength + " Dígitos </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }
    return false;

}

function Email(value, element, attrs, error) {

    function isEmail(attrs) {
        return attrs.email != undefined;
    }

    if (isEmail(attrs)) {
        var p = find(element, "email");
        var pattern = /^[a-zA-Z0-9._]+@[a-z0-9]+\.[a-z0-9\-]+(\.[a-z0-9\-]+)?$/i;
        if ((value != null) && (!pattern.test(value))) {
            if (!p) element.append("<p id='email' class='motive'> Email Inválido </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }
    return false;

}

function Confirmar(value, element, attrs, error) {

    function isConfirmar(attrs) {
        return attrs.confirmar != undefined;
    }

    if (isConfirmar(attrs)) {
        var p = find(element, "confirmacao");
        var senha = attrs.confirmar;
        if ((value != null || value == "") && (value != senha)) {
            if (!p) element.append("<p id='confirmacao' class='motive'> Valores não são iguais </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }
    return false;
}

function CPF(value, element, attrs, error) {
    function isCPF(attrs) {
        return attrs.cpf != undefined;
    }

    function validaCPF(input) {
        if (input != null && input != "") {
            if (input == '00000000000' || input == '11111111111' ||
                input == '22222222222' || input == '33333333333' ||
                input == '44444444444' || input == '55555555555' ||
                input == '66666666666' || input == '77777777777' ||
                input == '88888888888' || input == '99999999999') {
                return false;
            } else {
                input = input.toString();
                var numeros = [];
                var pesos_A = [10, 9, 8, 7, 6, 5, 4, 3, 2];
                var pesos_B = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var x1 = 0;
                var x2 = 0;

                for (var i = 0; i < 9 && i < input.length; i++) {
                    var digito = input[i];
                    sum = sum + digito * pesos_A[i];
                }

                //calcula digito 1
                var mod = sum % 11;
                if (mod >= 2) {
                    x1 = 11 - mod;
                }

                //calcula digito 2
                sum = 0;
                for (var i = 0; i < 10 && i < input.length; i++) {
                    sum = sum + input[i] * pesos_B[i];
                }

                var mod = sum % 11;
                if (mod >= 2) {
                    x2 = 11 - mod;
                }

                if (x1 == input[9] && x2 == input[10]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    if (isCPF(attrs)) {
        var p = find(element, "cpf");
        if ((value.length == 11) && !validaCPF(value)) {
            if (!p) element.append("<p id='cpf' class='motive'> CPF Inválido </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }

    return false;
}

function CNPJ(value, element, attrs, error) {
    function isCNPJ(attrs) {
        return attrs.cnpj != undefined;
    }

    function validaCNPJ(input) {
        if (input != null && input != "") {
            if (input == '00000000000000' || input == '11111111111111' ||
                input == '22222222222222' || input == '33333333333333' ||
                input == '44444444444444' || input == '55555555555555' ||
                input == '66666666666666' || input == '77777777777777' ||
                input == '88888888888888' || input == '99999999999999') {
                return false;
            } else {
                input = input.toString();
                var numeros = [];
                var pesos_A = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                var pesos_B = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
                var sum = 0;
                var x1 = 0;
                var x2 = 0;

                for (var i = 0; i < 12 && i < input.length; i++) {
                    var digito = input[i];
                    sum = sum + digito * pesos_A[i];
                }

                //calcula digito 1
                var mod = sum % 11;
                if (mod >= 2) {
                    x1 = 11 - mod;
                }

                //calcula digito 2
                sum = 0;
                for (var i = 0; i < 13 && i < input.length; i++) {
                    sum = sum + input[i] * pesos_B[i];
                }

                var mod = sum % 11;
                if (mod >= 2) {
                    x2 = 11 - mod;
                }

                if (x1 == input[12] && x2 == input[13]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
        return false;
    }

    if (isCNPJ(attrs)) {
        var p = find(element, "cnpj");
        if ((value.length == 14) && !validaCNPJ(value)) {
            if (!p) element.append("<p id='cnpj' class='motive'> CNPJ Inválido </p>");
            return true;
        } else {
            if (p) p.remove();
        }
    }

    return false;
}
