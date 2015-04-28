function sessionsDetailController($scope, focus, screenmatch, course, session, questions, Question, $state, $stateParams) {
    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });

    $scope.course = course;
    $scope.session = session;

    $scope.questions = questions.data;

    $scope.onSort = function(item, indexFrom, indexTo) {
        if ($state.current.name == 'questionsDetail') {
            $state.go('questionsDetail', {
                index: indexTo,
                questionId: item.id
            });
        }
    }

    $scope.$watchCollection('questions', function() {});

    var goToNewQuestion = function() {
        $state.go('questionsDetail', {
            index: ($scope.questions.length - 1),
            questionId: $scope.questions[$scope.questions.length - 1].id
        });
    }

    $scope.addMCQuestion = function() {
        Question.save({
                session_id: session.id,
                category: 'MC',
                name: 'Question',
                order: $scope.questions.length
            },
            function(response) {
                if (response.status == "success") {
                    $scope.questions.push(response.data.question);
                    focus('question-thumb-' + ($scope.questions[$scope.questions.length - 1].order));
                    goToNewQuestion();
                }
            });
    };
}

dashboard.controller('sessionsDetailController', ['$scope', 'focus', 'screenmatch', 'course', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsDetailController]);