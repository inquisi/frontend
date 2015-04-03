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

// Controllers
    
	// create the controller and inject Angular's $scope
    app.controller('mainController', function($scope, $filter) {
        varDate = new Date();
        year = $filter('date')(varDate, "yyyy")
        this.copyright = "\u00A9 " + year + " | iNQUiSi";
    });

    app.controller('validationController', function($scope, $http) {

        $scope.user ={role:"student"};
        $scope.objects = [{id: "student", value: "Student"}, {id: "instructor", value: "Instructor"}];

        // function to submit the form after all validation has occurred            
        this.submitForm = function(isValid, data) {

            // check to make sure the form is completely valid
            if (!isValid) return;

            //submit the data to the server
            $http.post('/api/submit', data);
        };
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

// Directives

    app.directive('equals', function() {
          return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, elem, attrs, ngModel) {
              if(!ngModel) return; // do nothing if no ng-model

              // watch own value and re-validate on change
              scope.$watch(attrs.ngModel, function() {
                validate();
              });

              // observe the other value and re-validate on change
              attrs.$observe('equals', function (val) {
                validate();
              });

              var validate = function() {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.equals;

                // set validity
                ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
              };
            }
          }
        });

})();
