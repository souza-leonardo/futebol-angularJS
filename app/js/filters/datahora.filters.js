(function () {
    'use strict';

    var filters = angular.module('app.filter', []);

    filters.filter('data', Data);
    filters.filter('datetime', DateTime);
    filters.filter('datahora', DataHora);
    filters.filter('mesref', Data_Ref);
    filters.filter('anomes', arqref);
    filters.filter('desformata', desformataDataHora);
    filters.filter('datalog', DataLog);
    filters.filter('mesano', mesano);
    filters.filter('diasemana', DiaSemana);
    filters.filter('horaformatada', HoraFormatada);
    filters.filter('mes', Mes);
    filters.filter('ano', Ano);
    filters.filter('elapsed', elapsedTime);
    // filters.filter('time', time);

    DateTime.$inject = ['appConfig'];

})();

function Data() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            input = new Date(input + "T12:00:00");
            input.setHours(0);
        }

        var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return input.toLocaleDateString('pt-BR', options);
    };
}

function DataHora() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            input = new Date(input);
        }

        var options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return input.toLocaleDateString('pt-BR', options);
    };
}

/**
 * Recebe dd/MM/YYYY e retorna yyyy-MM-dd
 */
function desformataDataHora() {
    return function (input) {
        if (input == null) {
            return input;
        }

        var campos = [];
        campos = input.split("/");

        var dataDesformatadaTipada = new Date(campos[2], campos[1] - 1, campos[0]);

        return dataDesformatadaTipada;
    };
}

function DateTime(appConfig) {
    return function (input) {
        if (input == null) {
            return null;
        }

        if (input.includes(":")) {
            return new Date(input);
        }

        var data_fuso = input + "T12:00:00";
        var date = new Date(data_fuso);
        date.setHours(0);
        return date;
    };
}

function DataLog() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            input = new Date(input);
            input.setHours(0);
        }

        var options = {year: 'numeric', month: 'numeric', day: 'numeric'};
        return input.toLocaleDateString('pt-BR', options);
    };
}

function Data_Ref() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            input = new Date(input + "T12:00:00");
            input.setHours(0);
        }

        var options = {year: 'numeric', month: 'numeric'};
        return input.toLocaleDateString('pt-BR', options);
    };
}

function arqref() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            input = new Date(input.substring(0, 4) + "-" + input.substring(4, 6) + "T12:00:00");
            input.setHours(0);
        }

        var options = {year: 'numeric', month: 'numeric'};
        return input.toLocaleDateString('pt-BR', options);
    };
}

function mesano() {
    return function (input) {
        if (input == null) {
            return "---";
        }
        if (typeof(input) == "string") {
            return input.substring(5, 7) + input.substring(0, 4);
        }
    };
}

function DiaSemana() {
    return function (input) {
        if (input == 0) {
            return "Domingo";
        } else if (input == 1) {
            return "Segunda";
        } else if (input == 2) {
            return "Terça";
        } else if (input == 3) {
            return "Quarta";
        } else if (input == 4) {
            return "Quinta";
        } else if (input == 5) {
            return "Sexta";
        } else if (input == 6) {
            return "Sábado";
        } else {
            return '---';
        }
    };
}

function HoraFormatada() {
    return function (input) {
        if (typeof(input) == "string") {
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }

            var d = new Date(input);
            var h = addZero(d.getHours());
            var m = addZero(d.getMinutes());

            return (h + ":" + m);
        }
    };

}

function Mes() {
    return function (input) {
        if (input == 0) {
            return "1";
        } else if (input == 1) {
            return "2";
        } else if (input == 2) {
            return "3";
        } else if (input == 3) {
            return "4";
        } else if (input == 4) {
            return "5";
        } else if (input == 5) {
            return "6";
        } else if (input == 6) {
            return "7";
        } else if (input == 7) {
            return "8";
        } else if (input == 8) {
            return "9";
        } else if (input == 9) {
            return "10";
        } else if (input == 10) {
            return "11";
        } else if (input == 11) {
            return "12";
        }
    };
}

function Ano() {
    return function (input) {
        if (input == 1) {
            return "2018";
        } else if (input == 2) {
            return "2019";
        } else if (input == 3) {
            return "2020";
        } else if (input == 4) {
            return "2021";
        } else if (input == 5) {
            return "2022";
        } else if (input == 6) {
            return "2023";
        }
    };
}

function elapsedTime() {
    return function (date) {
        if (!date) return;
        var time = Date.parse(date),
            timeNow = new Date().getTime(),
            difference = timeNow - time,
            seconds = Math.floor(difference / 1000),
            minutes = Math.floor(seconds / 60),
            hours = Math.floor(minutes / 60),
            days = Math.floor(hours / 24);
        if (days > 1) {
            return days + " dias ";
        } else if (days == 1) {
            return "1 dia";
        } else if (hours > 1) {
            return hours + " horas";
        } else if (hours == 1) {
            return "1 hora";
        } else if (minutes > 1) {
            return minutes + " minutos";
        } else if (minutes == 1) {
            return "1 minuto";
        } else {
            return "alguns segundos";
        }
    };
}
