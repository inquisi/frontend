(function(){
	var app = angular.module('inquisi', ['ui.router']);

	app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/login');

        $stateProvider
            // route for the loginPanel page
            .state('loginPanel', {
                url: '/login',
                abstract: true,
                templateUrl : 'states/loginPanel.html'
            })

            // route for the login page
            .state('loginPanel.login', {
                url: "",
                templateUrl : 'states/loginPanel_states/login.html'
            })

            // route for the registration page
            .state('loginPanel.register', {
                url: '^/register',
                templateUrl : 'states/loginPanel_states/register.html'
            })

            // route for the password reset page
            .state('loginPanel.reset', {
                url: '^/reset',
                templateUrl : 'states/loginPanel_states/reset.html'
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

    app.controller('validationController', function($scope, $http, $window) {
        $scope.user ={role:"student"};
        $scope.objects = [{id: "student", value: "Student"}, {id: "instructor", value: "Instructor"}];

        // function to submit the form after all validation has occurred            
         $scope.submit = function(form, isValid, data) {

            // check to make sure the form is completely valid
            if (isValid && (form == 'registration')){
               $window.alert(data.email + " tried to use the " + form + " form.");
            }  else if (form == 'login' || form == 'reset'){
                $window.alert(data.email + " tried to use the " + form + " form.");
            } else {
                $window.alert("Invalid");

            };
        };
    });

// Directives
    app.directive('disableValidators', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                var validator = function(value) {
                    return value;
                };

                // replace the email validators
                ctrl.$validators = {email: validator};
            }
        }
    });

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
