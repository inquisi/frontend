function loginController($rootScope, $scope, $state, AuthService, focus) {
    // function to submit the form after all validation has occurred            
    $scope.submit = function() {
        if ($scope.user == undefined) {
            $scope.errorMessage = "Please enter your information";
            focus('userEmail');
        } else if ($scope.user.email == undefined) {
            $scope.errorMessage = "Please enter an email";
            focus('userEmail');
        } else if ($scope.user.password == undefined) {
            $scope.errorMessage = "Please enter a password";
            focus('userPassword');
        } else {
            AuthService.login($scope.user.email, $scope.user.password)
                .then(function() {
                    if ($rootScope.redirectAfterLogin) {
                        var redirectAfterLogin = $rootScope.redirectAfterLogin;
                        delete $rootScope.redirectAfterLogin;
                        $state.go(redirectAfterLogin);
                    } else {
                        $state.go('dashboard.home');
                    }
                }, function(data) {
                    $scope.errorMessage = data.message;
                    debugger
                });
        }
    }
}

login.controller('loginController', ['$rootScope', '$scope', '$state', 'AuthService', 'focus', loginController]);