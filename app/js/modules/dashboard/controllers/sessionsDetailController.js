function sessionsDetailController($scope, focus, screenmatch, course, session, questions, Question, $state, $stateParams) {
    $scope.course = course;
    $scope.session = session;

    $scope.questions = questions.data;

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

    // $scope.$watchCollection('questions', function() {});

    var goToNewQuestion = function() {
        $state.go('questionsDetail', {
            index: ($scope.questions.length - 1),
            question: $scope.questions[$scope.questions.length - 1]
        });
    }

    $scope.addMCQuestion = function() {
        var question = {
            name: "Question",
            category: "MC",
            order: $scope.questions.length,
            course_id: $stateParams.courseId * 1,
            session_id: $stateParams.sessionId * 1
        };

        Question.save(question,
            function(response) {
                if (response.status == "success") {
                    $scope.questions.push(response.data.question);
                }
            });

        focus('question-thumb-' + ($scope.questions.length - 1));

        goToNewQuestion();
    };
}

dashboard.controller('sessionsDetailController', ['$scope', 'focus', 'screenmatch', 'course', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsDetailController]);