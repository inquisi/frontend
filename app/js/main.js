(function() {
    angular.module('inquisi', ['ui.router', 'login'])

    function mainController($scope, $filter) {
        varDate = new Date();
        year = $filter('date')(varDate, "yyyy")
        this.copyright = "\u00A9 " + year + " | iNQUiSi";
    }

    angular
        .module('inquisi')
        .controller('mainController', mainController);
})();