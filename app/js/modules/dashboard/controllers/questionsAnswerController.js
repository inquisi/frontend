function questionsAnswerController($scope, $state, $stateParams, question) {
    $scope.question = question;



    $scope.submitAnswer = function(answerId) {
        console.log('answerId', answerId)
        // submit the answer?
    }
};

dashboard.controller('questionsAnswerController', ['$scope', '$state', '$stateParams', 'question', questionsAnswerController]);