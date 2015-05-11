function questionsEditController($scope, $filter, focus, question, Question, Answer, $stateParams) {
    $scope.index = $stateParams.index;


    if (question == undefined) {
        focus('questionName');
    } else {
        $scope.question = question;
    }

    $scope.question.answers = $filter('orderBy')($scope.question.answers, 'order', false);

    $scope.$watch('question', function(newQ, oldQ) {
        if (!_.isEqual(newQ, oldQ)) {
            Question.update($scope.question);
        }
    }, true);

    $scope.onSortAnswer = function(indexFrom, indexTo) {
        angular.forEach($scope.question.answers, function(answer, newIndex) {
            answer.order = newIndex;
            Answer.update(answer);
        });
    }

    $scope.addAnswer = function() {
        Answer.save({
            question_id: $scope.question.id,
            name: ("Option " + ($scope.question.answers.length + 1)),
            correct: false,
            catgeory: "MC",
            order: $scope.question.answers.length
        }, function(response) {
            if (response.status == "success") {
                $scope.question.answers.push(response.data.answer);
                focus("answer-" + ($scope.question.answers.length - 1));
            }
        })
    };

    $scope.toggleCorrect = function(answer) {
        answer.correct = !answer.correct;
        Answer.update(answer);
    }

    $scope.$watch('question.answers', function(newVal, oldVal) {
        if (!_.isEqual(newVal, oldVal)) {
            for (var i = 0; i < newVal.length; i++) {
                if (oldVal[i] == undefined) {
                    Answer.update(newVal[i]);
                } else if (newVal[i].name != oldVal[i].name) {
                    Answer.update(newVal[i]);
                }
            };
        }
    }, true);
}

dashboard.controller('questionsEditController', ['$scope', '$filter', 'focus', 'question', 'Question', 'Answer', '$stateParams', questionsEditController]);