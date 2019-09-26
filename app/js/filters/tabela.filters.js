(function () {
    'use strict';

    var filters = angular.module('app');

    filters.filter('numero', Numero);
    filters.filter('moeda', Moeda);
    filters.filter('moeda2', Moeda2);
    filters.filter('porcentagem', Porcentagem);
    filters.filter('vazio', Vazio);
    filters.filter('cnpj_cpf', CNPJ_CPF);
    filters.filter('arquivo_voip', ArquivoVoip);
    filters.filter('st_Conv', st_Conv);
    filters.filter('st_log', st_Log);
    filters.filter('dt_rel', dt_rel);
    filters.filter('cep', cep);
    filters.filter('status', status);
    filters.filter('propsFilter', propsFilter);
    filters.filter('timeStatus', timeStatus);
    filters.filter('truncate', truncate);
    filters.filter('horamin', horamin);
    filters.filter('tel', tel);
    filters.filter('htmlDecode', htmlDecode);
    filters.filter('contTipo', contTipo);

})();


function Vazio() {
    return function (input) {
        if (input == null || input == "") {
            return "---";
        }

        return input;
    };
}

function Numero() {
    return function (input) {
        if (input == null) {
            return 0;
        }

        return input;
    };
}

function Moeda() {
    return function (input, unidade) {
        if (input == null) {
            return ((unidade == null || unidade == true) ? "R$ " : "") + "0,00";
        }

        input = input.toString();
        input = (input.includes(".")) ? (input.replace(".", ",")) : (input + ",00");

        if (input == 0 || input == '0') {
            return "R$ 0,00";
        }

        if (input.split(",")[1].length == 1) {
            input = input + "0";
        }
        return ((unidade == null || unidade == true) ? "R$ " : "") + input;
    };
}

function Moeda2() {
    return function (input, unidade) {
        if (input == null) {
            return ((unidade == null || unidade == true) ? "R$ " : "") + "0,00";
        }

        input = input.toString();
        input = (input.includes(".")) ? (input.replace(".", ",")) : input;

        if (input == 0 || input == '0') {
            return "R$ 0,00";
        }

        if (input.split(",")[1].length == 1) {
            input = input + "0";
        }
        return ((unidade == null || unidade == true) ? "R$ " : "") + input;
    };
}

function Porcentagem() {
    return function (input) {
        if (input == null) {
            return "0,00 %";
        }

        input = input.toString();
        if (input.includes(".") || input.includes(",")) {
            input = input.replace(".", ",");
        } else {
            input = input + ",00";
        }

        if (input.split(",")[1].length == 1) {
            input = input + "0";
        }
        return input + " %";
    };
}

function CNPJ_CPF() {
    return function (input) {
        if (input == null) {
            return "---";
        }

        if (input.length == 14) {
            return input.substr(0, 2) + "." + input.substr(2, 3) + "." + input.substr(5, 3) + "/" + input.substr(8, 4) + "-" + input.substr(12, 2);
        } else if (input.length == 11) {
            return input.substr(0, 3) + "." + input.substr(3, 3) + "." + input.substr(6, 3) + "-" + input.substr(9, 2);
        } else {
            return "---";
        }
    };
}

function ArquivoVoip() {
    return function (input) {
        if (input == null) {
            return "<span class='red-text'> NÃO ENCONTRADO </span>";
        }

        return "<span>" + input + "</span>";
    };
}

function st_Conv() {
    return function (input) {
        if (input == 0) {
            return "<span class='amber-text'> AGUARDANDO INICIO </span>";
        } else if (input == 1) {
            return "<span class='blue-text'> GERANDO </span>";
        } else if (input == 2) {
            return "<span class='green-text'> DISPONÍVEL </span>";
        } else if (input == 3) {
            return "<span class='red-text'> ERRO </span>";
        } else {
            return '---';
        }
        return "<span>" + input + "</span>";
    };
}

function st_Log() {
    return function (input) {
        if (input == 0) {
            return "<span class='blue-text'> IMPORTANDO </span>";
        } else if (input == 1) {
            return "<span class='green-text'> IMPORTADO </span>";
        } else if (input == 2) {
            return "<span class='red-text'> ERRO </span>";
        } else {
            return '---';
        }
        return "<span>" + input + "</span>";
    };
}

function dt_rel() {
    return function (input) {
        if (input == null) {
            return "---";
        } else if (input.length == 8) {
            var result = input.substr(0, 2) + "/" + input.substr(2, 2) + "/" + input.substr(4, 4);
            return result;
        } else if (input.length == 6) {
            var result = input.substr(0, 2) + "/" + input.substr(2, 4);
            return result;
        }
    };
}

function cep() {
    return function (input) {
        if (input == null) {
            return "---";
        } else {
            var result = input.substr(0, 5) + "-" + input.substr(5, 3);
            return result;
        }
    };
}

function status() {
    return function (input) {
        if (input == 0) {
            return "<span class='text-danger'> INATIVO </span>";
        } else if (input == 1) {
            return "<span class='text-success'> ATIVO </span>";
        } else {
            return '---';
        }
        return "<span>" + input + "</span>";
    };
}

function propsFilter() {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
}

function timeStatus() {
    return function (input) {
        if (input >= 1 && input <= 15) {
            return "<span class='text-green'> " + input + " </span>";
        } else if (input >= 16 && input <= 30) {
            return "<span class='text-warning'> " + input + " </span>";
        } else if (input >= 31) {
            return "<span class='text-danger'> " + input + " </span>";
        } else {
            return '---';
        }
        return "<span>" + input + "</span>";

    };
}

function truncate() {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = " ...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }
    };
}

function horamin() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        var aux = input.split(':');
        return aux[0] + ':' + aux[1];
    };
}

function tel() {
    return function (input) {
        var str = input + '';
        str = str.replace(/\D/g, '');
        if (str.length === 11) {
            str = str.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else {
            str = str.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        }
        return str;
    };

}

function htmlDecode() {

    return function (input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes[0].nodeValue;
    };
}

function contTipo() {
    return function (input) {
        if (input == 0) {
            return "<span> Contato </span>";
        } else if (input == 1) {
            return "<span> Colaborador </span>";
        } else if (input == 2) {
            return "<span> Empresa </span>";
        }
         else {
            return '---';
        }
        return "<span>" + input + "</span>";
    };
}
