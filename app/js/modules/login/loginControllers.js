var login = angular.module('login');

// Controllers

	login.controller('validationController', function($scope, $http, $window) {
		$scope.user = {
			role: "student"
		};
		$scope.objects = [{
			id: "student",
			value: "Student"
		}, {
			id: "instructor",
			value: "Instructor"
		}];

		// function to submit the form after all validation has occurred            
		$scope.submit = function(form, isValid, data) {

			// check to make sure the form is completely valid
			if (isValid && (form == 'registration')) {
				$window.alert(data.email + " tried to use the " + form + " form.");
			} else if (form == 'login' || form == 'reset') {
				$window.alert(data.email + " tried to use the " + form + " form.");
			} else {
				$window.alert("Invalid");

			};
		};
	});