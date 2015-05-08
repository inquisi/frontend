function sessionsReadController($rootScope, $scope, $filter, focus, screenmatch, course, Session, session, questions, Question, $state, $stateParams) {
    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    if ($scope.questions.length > 0) {
        $state.go('questionsDetail', {
            index: $scope.questions[0].order,
            questionId: $scope.questions[0].id
        })
    }
}

dashboard.controller('sessionsReadController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'Session', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsReadController]);