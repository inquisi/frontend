function sessionsAnswerController($scope, $filter, course, session, questions, $state) {
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);
    });

    $state.go('questionsAnswer', {
        index: $scope.questions[0].order,
        questionId: $scope.questions[0].id
    });
};

dashboard.controller('sessionsAnswerController', ['$scope', '$filter', 'course', 'session', 'questions', '$state', sessionsAnswerController]);