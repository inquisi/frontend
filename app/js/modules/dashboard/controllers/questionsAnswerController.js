function questionsAnswerController($scope, $state, $stateParams, question, sessionChannel) {
    $scope.question = question;

    sessionChannel.bind('question_activate', function(question) {
        $state.go('questionsAnswer', {
            sessionId: $stateParams.sessionId,
            courseId: $stateParams.courseId,
            questionId: question.id
        });
    });

    sessionChannel.bind('session_end', function() {
        $state.go('sessions.read', $stateParams);
    });

    $scope.submitAnswer = function(answerId) {
        console.log('answerId', answerId)
        // submit the answer?
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'question', 'sessionChannel', questionsAnswerController]);