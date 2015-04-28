function questionsDetailController($scope, focus, question, Question, answers, Answer, $stateParams) {
    $scope.index = $stateParams.index;
    $scope.question = question;

    $scope.answers = answers.data;

    focus('questionName');

    $scope.editQuestion = function(question) {
        // Question.update(question, function() {
        // });
    }

    // $scope.addAnswer = function() {
    //     $scope.question.answers.push("");
    // }
}

dashboard.controller('questionsDetailController', ['$scope', 'focus', 'question', 'Question', 'answers', 'Answer', '$stateParams', questionsDetailController]);