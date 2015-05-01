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
            order: $scope.question.answers.length
        }, function(response) {
            if (response.status == "success") {
                $scope.question.answers.push(response.data);
                debugger
                focus("answer-" + ($scope.question.answers.length - 1));
            }
        })
    };

    $scope.$watchCollection('question.answers', function(newVal, oldVal) {
        var updatedAnswer = _.difference(newVal, oldVal);

        if (updatedAnswer.length > 0) {
            Answer.update(updatedAnswer[0]);
        }
    });
}

dashboard.controller('questionsDetailController', ['$scope', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsDetailController]);