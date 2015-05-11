function sessionsPresentController($rootScope, $scope, $filter, focus, screenmatch, course, Session, session, questions, Question, $state, $stateParams) {
    $scope.course = course;
    $scope.session = session;
    $scope.questions = $filter('orderBy')(questions.data, 'order', false);

    angular.forEach($scope.questions, function(question) {
        question.answers = $filter('orderBy')(question.answers, 'order', false);
    });

    Session.activate({
        id: $scope.session.id,
        active: true
    });

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

    $scope.toggleFS = function() {
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
}

dashboard.controller('sessionsPresentController', ['$rootScope', '$scope', '$filter', 'focus', 'screenmatch', 'course', 'Session', 'session', 'questions', 'Question', '$state', '$stateParams', sessionsPresentController]);