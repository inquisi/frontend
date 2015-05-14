function sessionsAnswerController($scope, $filter, course, session, questions, $state, sessionChannel, $stateParams) {
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);

        if (question.active) {
            $scope.question = question;
        }
    });

    sessionChannel.bind('question_activate', function(question) {
        $state.go('questionsAnswer', {
            sessionId: $stateParams.sessionId,
            courseId: $stateParams.courseId,
            questionId: question.id
        });
    });

    sessionChannel.bind('session_end', function() {
        $state.go('sessions.answer', $stateParams);
    });

    if (_.any($scope.questions, 'active')) {
        $state.go('questionsAnswer', {
            questionId: _.find($scope.questions, {
                active: true
            }).id
        });
    }
};

dashboard.controller('sessionsAnswerController', ['$scope', '$filter', 'course', 'session', 'questions', '$state', 'sessionChannel', '$stateParams', sessionsAnswerController]);