function sessionsDetailController($scope, $filter, focus, screenmatch, course, session, questions, Question, $state, $stateParams) {
    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });


    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    if ($scope.questions.length > 0) {
        $state.go('questionsDetail', {
            index: 0,
            questionId: $scope.questions[0].id
        });
    }

    $scope.onSort = function(indexFrom, indexTo) {
        angular.forEach($scope.questions, function(question, newIndex) {
            question.order = newIndex;
            Question.update(question);
        });

        $state.go('questionsDetail', {
            index: indexTo,
            questionId: $scope.questions[indexTo].id
        });
    }

    // $scope.$watchCollection('questions', function() {});

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

dashboard.controller('sessionsDetailController', ['$scope', '$filter', 'focus', 'screenmatch', 'course', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsDetailController]);