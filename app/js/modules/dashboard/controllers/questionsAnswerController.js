function questionsAnswerController($scope, $state, $stateParams, question, websocketDispatcher, currentUser) {
    $scope.question = question;

    $scope.selectedAnswerId = null;
    $scope.submitAnswer = function(answerId) {
        console.log('answerId', answerId);
        websocketDispatcher.trigger('question.respond', {
            question_id: $scope.question.id,
            answer_id: answerId,
            token: currentUser.token
        });
        $scope.selectedAnswerId = answerId;
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'question', 'websocketDispatcher', 'currentUser', questionsAnswerController]);