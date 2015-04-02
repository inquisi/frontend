(function(){
	var app = angular.module('inquisi', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/login');

        $stateProvider
            // route for the loginPanel page
            .state('loginPanel', {
                url: '/login',
                abstract: true,
                templateUrl : 'states/loginPanel.html',
                controller  : 'loginPanelController'
            })

            // route for the login page
            .state('loginPanel.login', {
                url: "",
                templateUrl : 'states/loginPanel_states/login.html',
                controller  : 'loginController'
            })

            // route for the registration page
            .state('loginPanel.register', {
                url: '^/register',
                templateUrl : 'states/loginPanel_states/register.html',
                controller  : 'registerController'
            })

            // route for the password reset page
            .state('loginPanel.reset', {
                url: '^/reset',
                templateUrl : 'states/loginPanel_states/reset.html',
                controller  : 'resetController'
            });

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
	});

	// create the controller and inject Angular's $scope
    app.controller('mainController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });

    app.controller('loginPanelController', function($scope) {
        // create a message to display in our view
        $scope.message = 'login panel!';
    });

    app.controller('loginController', function($scope) {
        // create a message to display in our view
        $scope.message = 'login page!';
    });

    app.controller('registerController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Registration!';
    });

    app.controller('resetController', function($scope) {
        // create a message to display in our view
        $scope.message = 'Reset password!';
    });
})();
