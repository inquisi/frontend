function studentsController($scope, courses, students) {
    $scope.students = students.data;

    $scope.coursesForFilter = courses.data;
}

dashboard.controller('studentsController', ['$scope', 'courses', 'students', studentsController]);