function sessionsDetailController($scope, course, session, questions, Question, $stateParams) {
    $scope.course = course;
    $scope.session = session;

    $scope.$watchCollection('questions', function() {});

}

dashboard.controller('sessionsDetailController', ['$scope', 'course', 'session', 'questions', 'Question', '$stateParams', sessionsDetailController]);