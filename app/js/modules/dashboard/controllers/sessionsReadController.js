function sessionsReadController($rootScope, $scope, $filter, focus, screenmatch, course, Session, session, questions, Question, $state, $stateParams) {
    screenmatch.when('xs, sm', function() {
        $scope.horiz = true;
    }, function() {
        $scope.horiz = false;
    });

    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    if ($scope.questions.length > 0) {
        $state.go('questionsRead', {
            index: $scope.questions[0].order,
            questionId: $scope.questions[0].id
        })
    }

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
            $state.go('questionsRead', {
                index: index - 1,
                questionId: $scope.questions[index - 1].id
            });
            focus('question-thumb-' + $scope.questions[index - 1].order);
        } else {
            return
        }
    }

    $scope.goToNextQuestion = function() {
        var index = $state.params.index;
        if (index < $scope.questions.length - 1) {
            $state.go('questionsRead', {
                index: index + 1,
                questionId: $scope.questions[index + 1].id
            });

            focus('question-thumb-' + $scope.questions[index + 1].order);
        } else {
            return
        }
    }
}

dashboard.controller('sessionsReadController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'Session', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsReadController]);