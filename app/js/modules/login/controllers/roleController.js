function roleController($scope, $http, $window) {
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
}

login.controller('roleController', roleController);