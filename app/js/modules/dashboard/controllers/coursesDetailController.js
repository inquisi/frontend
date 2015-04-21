function coursesDetailController($scope, Course, $stateParams) {
    var id = $stateParams.id * 1;


    $scope.$watch('courses', function() {
        $scope.course = _.find($scope.$parent.courses, {
            id: id
        });
    });
}

dashboard.controller('coursesDetailController', ['$scope', 'Course', '$stateParams', coursesDetailController]);