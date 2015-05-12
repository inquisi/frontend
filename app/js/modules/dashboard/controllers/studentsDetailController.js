function studentsDetailController($scope, student) {
    $scope.student = student;
}

dashboard.controller('studentsDetailController', ['$scope', 'student', studentsDetailController]);