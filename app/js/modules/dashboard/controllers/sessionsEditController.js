function sessionsEditController($rootScope, $scope, $filter, focus, screenmatch, course, Session, session, questions, Question, $state, $stateParams) {
    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);
    });

    if ($scope.questions.length > 0) {
        $state.go('questionsEdit', {
            index: $scope.questions[0].order,
            questionId: $scope.questions[0].id
        })
    }

    $scope.onSortQuestion = function(indexFrom, indexTo) {
        angular.forEach($scope.questions, function(question, newIndex) {
            question.order = newIndex;
            Question.update(question);
        });

        $state.go('questionsEdit', {
            index: indexTo,
            questionId: $scope.questions[indexTo].id
        });
    }

    // $scope.$watchCollection('questions', function() {});

    var goToNewQuestion = function() {
        $state.go('questionsEdit', {
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
                    $scope.question = response.data.question;
                }
            });
    };

    $scope.canPrev = false;
    $scope.canNext = false;

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            var index = toParams.index;

            if (index == 0) {
                $scope.canPrev = false;
                if ($scope.questions.length - 1 == 0) {
                    $scope.canNext = false;
                } else {
                    $scope.canNext = true;
                }
            } else if (index == $scope.questions.length - 1) {
                $scope.canPrev = true;
                $scope.canNext = false;
            } else {
                $scope.canPrev = true;
                $scope.canNext = true;
            }
        });

    $scope.goToPrevQuestion = function() {
        var index = $state.params.index;

        if (index > 0) {
            $state.go('questionsEdit', {
                index: index - 1,
                questionId: $scope.questions[index - 1].id
            });
            focus('question-thumb-' + $scope.questions[index - 1].order);
        } else {
            return
        }
    }

    $scope.togglePresentation = function() {
        $state.go('sessions.present', {
            sessionId: $scope.session.id,
            present: true
        })
    }

    $scope.goToNextQuestion = function() {
        var index = $state.params.index;
        if (index < $scope.questions.length - 1) {
            $state.go('questionsEdit', {
                index: index + 1,
                questionId: $scope.questions[index + 1].id
            });

            focus('question-thumb-' + $scope.questions[index + 1].order);
        } else {
            return
        }
    }
}

dashboard.controller('sessionsEditController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'Session', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsEditController]);