function sessionsAnswerController($scope, $filter, course, session, questions, $state, $window, sessionChannel, $stateParams) {
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);

        if (question.active) {
            $scope.question = question;
        }
    });

    sessionChannel.bind('question.activate', function(question) {
        $state.go('questionsAnswer', {
            sessionId: $stateParams.sessionId,
            courseId: $stateParams.courseId,
            question: question
        });
    });

    sessionChannel.bind('session.end', function() {
        $state.go('sessions.answer', $stateParams);
    });
    if (_.any($scope.questions, 'active')) {
        $state.go('questionsAnswer', {
            question: _.find($scope.questions, {
                active: true
            })
        });
    }
};

dashboard.controller('sessionsAnswerController', ['$scope', '$filter', 'course', 'session', 'questions', '$state', '$window', 'sessionChannel', '$stateParams', sessionsAnswerController]);