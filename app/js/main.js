(function() {
    angular.module('inquisi', ['ui.router', 'ngResource', 'ngCookies', // vendor dependencies
        'login', 'resources', 'dashboard' // our dependencies
    ]);
})();

var main = angular.module('inquisi');