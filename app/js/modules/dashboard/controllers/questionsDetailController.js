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

    $scope.addAnswer = function() {
        Answer.save({
            question_id: question.id,
            name: "A",
            correct: false,
            catgeory: "mc",
            order: $scope.question.answers.length
        }, function(response) {
            if (response.status == "success") {
                $scope.question.answers.push(response.data);
                focus("answer-" + ($scope.question.answers.length - 1));
            }
        })
    };

    $scope.$watch('question.answers', function(newVal, oldVal) {
        if (!_.isEqual(newVal, oldVal)) {
            for (var i = 0; i < newVal.length; i++) {
                if (newVal[i].name != oldVal[i].name) {
                    Answer.update(newVal[i]);
                }
            };
        }
    }, true);
}

dashboard.controller('questionsDetailController', ['$scope', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsDetailController]);