function studentController($scope, students) {
    $scope.students = students.data;
}

dashboard.controller('studentController', ['$scope', 'students', studentController]);