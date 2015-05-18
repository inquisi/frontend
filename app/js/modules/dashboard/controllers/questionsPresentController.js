function questionsPresentController($scope, $filter, focus, question, Question, Answer, $stateParams, sessionChannel) {
    $scope.index = $stateParams.index;

    if (question == undefined) {
        focus('questionName');
    } else {
        $scope.question = question;
    }

    $scope.question.answers = $filter('orderBy')($scope.question.answers, 'order', false);
    $scope.question.responses = [];

    sessionChannel.bind('question.respond', function(response) {
        var previousResponse = _.find($scope.question.responses, {
            user_id: response.user_id
        })
        if (previousResponse != undefined) {
            previousResponse.answer_id = response.answer_id;
        } else {
            $scope.question.responses.push(response);
        }
        $scope.$digest();
    });
}

dashboard.controller('questionsPresentController', ['$scope', '$filter', 'focus', 'question', 'Question', 'Answer', '$stateParams', 'sessionChannel', questionsPresentController]);