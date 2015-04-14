function registerController($scope, $state, User, AuthService) {
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
    $scope.submit = function() {
        User.create($scope.user, function(response) {
            // return a token or message
            if (response.status == "success") {
                var token = response.data.user.token;
                AuthService.login(token);
                $state.go('dashboard.welcome');
            } else {
                $scope.errorMessage = response.message;
            }
        });
    }
}

login.controller('registerController', ['$scope', '$state', 'User', 'AuthService', registerController]);