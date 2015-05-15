function questionsAnswerController($scope, $state, $stateParams, question) {
    $scope.question = question;

    $scope.selectedAnswerId = null;
    $scope.submitAnswer = function(answerId) {
        console.log('answerId', answerId);
        // submit the answer?
        $scope.selectedAnswerId = answerId;
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'question', questionsAnswerController]);