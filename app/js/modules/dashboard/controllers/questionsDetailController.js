function questionsDetailController($scope, $stateParams) {
    $scope.index = $stateParams.index;
    $scope.question = $stateParams.question;

    $scope.pushQuestion = function(index, question) {
        $scope.questions.splice(index, 1, question);
    }

    $scope.addAnswer = function() {
        $scope.question.answers.push("");
    }
}

dashboard.controller('questionsDetailController', ['$scope', '$stateParams', questionsDetailController]);