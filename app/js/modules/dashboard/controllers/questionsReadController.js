function questionsReadController($scope, $filter, focus, question, Question, Answer, $stateParams) {
    $scope.index = $stateParams.index;

    if (question == undefined) {
        focus('questionName');
    } else {
        $scope.question = question;
    }

    $scope.question.answers = $filter('orderBy')($scope.question.answers, 'order', false);

}

dashboard.controller('questionsReadController', ['$scope', '$filter', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsReadController]);