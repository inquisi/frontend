function questionsDetailController($scope, focus, question, Question, Answer, $stateParams) {
    $scope.index = $stateParams.index;
    $scope.question = question;

    $scope.printQuestion = function() {
        console.log($scope.question);
    }

    $scope.$watch('question', function(newQ, oldQ) {
        if (!_.isEqual(newQ, oldQ)) {
            Question.update(question);
        }
    }, true);

    // $scope.addAnswer = function() {
    //     $scope.question.answers.push("");
    // }
}

dashboard.controller('questionsDetailController', ['$scope', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsDetailController]);