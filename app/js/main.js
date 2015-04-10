(function() {
    angular.module('inquisi', ['ui.router', 'ngResource', // vendor dependencies
        'login', 'resources', 'dashboard' // our dependencies
    ]);
})();

var main = angular.module('inquisi');