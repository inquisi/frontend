function questionsAnswerController($scope, $state, $stateParams, websocketDispatcher, question, currentUser) {
    $scope.question = question;

    $scope.selectedAnswerId = null;
    $scope.submitAnswer = function(answerId) {
        console.log('answerId', answerId);
        websocketDispatcher.trigger('student.answer_question', {
            answer: answerId,
            user: {
                id: currentUser.id
            }
        })
        $scope.selectedAnswerId = answerId;
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'websocketDispatcher', 'question', 'currentUser', questionsAnswerController]);