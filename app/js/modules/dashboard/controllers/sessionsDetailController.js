function sessionsDetailController($scope, focus, screenmatch, course, session, questions, Question, $state, $stateParams) {
    $scope.course = course;
    $scope.session = session;

    $scope.questions = [{
        name: 'What is 2 + 2?',
        answers: ['1', '2', '3', '4']
    }, {
        name: 'What is A + B?',
        answers: ['A', 'B', 'C', 'D']
    }];

    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });

    $scope.onSort = function(item, indexFrom, indexTo) {
        if ($state.current.name == 'questionsDetail') {
            $state.go('questionsDetail', {
                index: indexTo,
                question: item
            });
        }
    }

    $scope.$watchCollection('questions', function() {});

    var goToNewQuestion = function() {
        $state.go('questionsDetail', {
            index: ($scope.questions.length - 1),
            question: $scope.questions[$scope.questions.length - 1]
        });
    }

    $scope.addMCQuestion = function() {
        $scope.questions.push({
            title: 'Question',
            answers: ['A', 'B', 'C', 'D']
        });

        focus('question-thumb-' + ($scope.questions.length - 1));

        goToNewQuestion();
    };
}

dashboard.controller('sessionsDetailController', ['$scope', 'focus', 'screenmatch', 'course', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsDetailController]);