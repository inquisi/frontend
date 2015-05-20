function registerController($scope, $state, User, AuthService, focus) {
    focus('register_email');

    $scope.user = {
        role: "Student"
    };
    $scope.objects = [{
        id: "Student",
        value: "Student"
    }, {
        id: "Instructor",
        value: "Instructor"
    }];

    // function to submit the form after all validation has occurred            
    $scope.submit = function() {
        User.create($scope.user, function(response) {
            // return a token or message
            if (response.status == "success") {
                var token = response.data.user.token;
                AuthService.login(token);
                $state.go('dashboard.home');
            } else {
                $scope.errorMessage = response.message;
            }
        });
    }
}

login.controller('registerController', ['$scope', '$state', 'User', 'AuthService', 'focus', registerController]);