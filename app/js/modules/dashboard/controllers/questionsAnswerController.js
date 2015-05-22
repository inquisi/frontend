function questionsAnswerController($scope, $state, $stateParams, websocketDispatcher, currentUser) {
    $scope.question = $stateParams.question;

    $scope.selectedAnswerId = _.get(_.find($scope.question.responses, {
        user_id: currentUser.id
    }), 'answer_id');

    $scope.submitAnswer = function(answerId) {
        websocketDispatcher.trigger('question.respond', {
            question_id: $scope.question.id,
            answer_id: answerId,
            token: currentUser.token
        });

        $scope.selectedAnswerId = answerId;
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'websocketDispatcher', 'currentUser', questionsAnswerController]);