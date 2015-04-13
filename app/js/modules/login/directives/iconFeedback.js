function iconFeedback() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            fuiIcon: '@',
            input: '='
        }, // {} = isolate, true = child, false/undefined = no change
        require: '^form', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'js/modules/login/directives/templates/iconFeedback.html',
        replace: true,
        link: function(scope, element, attrs, form) {
            var parent = scope.$parent;
            var input = attrs.input;

            scope.$watch(function() {
                return form[input].$pristine;
            }, function() {
                scope.pristine = form[input].$pristine;
            });

            scope.$watch(function() {
                return form[input].$valid;
            }, function() {
                scope.valid = form[input].$valid;
            });
        }
    }
}

login.directive('iconFeedback', [iconFeedback]);