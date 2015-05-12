function sessionsPresentController($rootScope, $scope, $filter, focus, screenmatch, course, Session, session, questions, Question, $state, $stateParams) {
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);
    });

    if ($scope.fsState = undefined || !$scope.fsState) {
        $state.go('sessions.edit', {
            sessionId: $scope.session.id
        });
    }

    focus("question-present-container");

    $state.go('questionsPresent', {
        index: $scope.questions[0].order,
        questionId: $scope.questions[0].id
    })

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            var index = toParams.index;

            if (index == 0) {
                $scope.canPrevPresent = false;
                if ($scope.questions.length - 1 == 0) {
                    $scope.canNextPresent = false;
                } else {
                    $scope.canNextPresent = true;
                }
            } else if (index == $scope.questions.length - 1) {
                $scope.canPrevPresent = true;
                $scope.canNextPresent = false;
            } else {
                $scope.canPrevPresent = true;
                $scope.canNextPresent = true;
            }
        });

    $scope.prevQuestion = function() {
        var index = $state.params.index;

        if (index > 0) {
            $state.go('questionsPresent', {
                index: index - 1,
                questionId: $scope.questions[index - 1].id
            });
        } else {
            return
        }
    }

    $scope.nextQuestion = function() {
        var index = $state.params.index;
        if (index < $scope.questions.length - 1) {
            $state.go('questionsPresent', {
                index: index + 1,
                questionId: $scope.questions[index + 1].id
            });
        } else {
            return
        }
    }

    $scope.launchFS = function() {
        $scope.fsState = true;

        function launchFS(element) {
            if (element.requestFullScreen) element.requestFullScreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullScreen) element.webkitRequestFullScreen();

            focus("question-present-container");
        }

        launchFS(document.documentElement);
    }

    $scope.cancelFS = function() {
        $scope.fsState = false;

        function cancelFS() {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();

            focus("question-present-container");
        }

        cancelFS();
    }

    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', exitHandler, false);
        document.addEventListener('mozfullscreenchange', exitHandler, false);
        document.addEventListener('fullscreenchange', exitHandler, false);
        document.addEventListener('MSFullscreenChange', exitHandler, false);
    }

    function exitHandler() {
        if (!document.webkitIsFullScreen || document.mozFullScreen || (document.fullscreenElement && document.fullscreenElement !== null)) {
            $scope.fsState = false;

            $state.go('sessions.edit', {
                id: $scope.session.id
            });
        }
    }
}

dashboard.controller('sessionsPresentController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'Session', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsPresentController]);