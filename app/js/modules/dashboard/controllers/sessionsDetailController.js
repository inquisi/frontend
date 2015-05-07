function sessionsDetailController($rootScope, $scope, $filter, focus, screenmatch, course, session, questions, Question, $state, $stateParams) {
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
            $state.go('questionsDetail', {
                index: index - 1,
                questionId: $scope.questions[index - 1].id
            });
            focus('question-thumb-' + $scope.questions[index - 1].order);
        } else {
            return
        }
    }

    $scope.togglePresentation = function() {
        $scope.fsState = false;

        function launchFS(element) {
            if (element.requestFullScreen) element.requestFullScreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullScreen) element.webkitRequestFullScreen();
        }

        function cancelFS() {
            if (document.cancelFullScreen) document.cancelFullScreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        }

        if ($scope.fsState == false) launchFS(document.documentElement);
        else cancelFS();
        $scope.fsState = !$scope.fsState;
    }


    $scope.goToNextQuestion = function() {
        var index = $state.params.index;
        if (index < $scope.questions.length - 1) {
            $state.go('questionsDetail', {
                index: index + 1,
                questionId: $scope.questions[index + 1].id
            });

            focus('question-thumb-' + $scope.questions[index + 1].order);
        } else {
            return
        }
    }
}

dashboard.controller('sessionsDetailController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsDetailController]);