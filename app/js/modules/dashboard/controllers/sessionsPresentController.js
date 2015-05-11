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