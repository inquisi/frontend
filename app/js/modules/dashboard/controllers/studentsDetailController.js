function studentsDetailController($scope, student) {
    $scope.student = student;

    $scope.coursesForAnalytics = student.courses;
    $scope.courseFilter = $scope.coursesForAnalytics[0].id;
}

dashboard.controller('studentsDetailController', ['$scope', 'student', studentsDetailController]);