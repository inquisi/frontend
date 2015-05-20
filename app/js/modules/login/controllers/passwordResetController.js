function passwordResetController($scope, focus) {
    focus('reset_email');
    // function to submit the form after all validation has occurred            
    $scope.submit = function(email, password) {

    }
}

login.controller('passwordResetController', ['$scope', 'focus', passwordResetController]);