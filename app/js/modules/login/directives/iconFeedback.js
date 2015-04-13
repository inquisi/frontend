function iconFeedback() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: {
            fuiIcon: '@',
            ngModel: '='
        }, // {} = isolate, true = child, false/undefined = no change
        require: '^ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'js/modules/login/directives/templates/iconFeedback.html',
        replace: true,
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };
        }
    }
}

login.directive('iconFeedback', [iconFeedback]);