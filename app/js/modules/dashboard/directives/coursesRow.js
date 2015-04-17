function coursesRow() {
    // Runs during compile
    return {
        // name: '',
        // priority: 1,
        // terminal: true,
        scope: false, // {} = isolate, true = child, false/undefined = no change
        // controller: function($scope, $element, $attrs, $transclude) {},
        // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        // template: '',
        templateUrl: 'js/modules/dashboard/directives/templates/courses-row.html',
        replace: true,
        // transclude: true,
        // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
        link: function(scope, elm, attrs, controller) {}
    };
}

dashboard.directive('coursesRow', [coursesRow]);