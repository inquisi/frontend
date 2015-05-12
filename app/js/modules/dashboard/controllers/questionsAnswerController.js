function questionsAnswerController($scope, $filter, focus, question, Question, Answer, $stateParams) {
    $scope.question = question;
    $scope.question.answers = $filter('orderBy')($scope.question.answers, 'order', false);
};

dashboard.controller('questionsAnswerController', ['$scope', '$filter', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsAnswerController]);