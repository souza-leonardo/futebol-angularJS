(function () {
    'use strict';

    angular.module('app', []);
    var directives = angular.module('app');

    directives.directive("xlsRead", XLSRead);

    XLSRead.$inject = [];

})();

function XLSRead() {
    return {
        scope: {
            xlsFile: "=",
            xlsName: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                try {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.xlsFile = loadEvent.target.result;
                        });
                    };

                    if (!changeEvent.target.files[0].name.includes(".xls")) {
                        scope.xlsFile = -1;
                    }
                    scope.xlsName = changeEvent.target.files[0].name;
                    reader.readAsBinaryString(changeEvent.target.files[0]);
                } catch (e) {
                    scope.xlsFile = -1;
                }
            });
        }
    };
}
