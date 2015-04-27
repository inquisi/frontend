function dragVert() {
    return {
        'restrict': 'A',
        'template': '<div class="question-thumb" hm-panmove="onHammer">{{boxMessage}}</div>',
        'link': function(scope, element, attrs) {
            scope.onHammer = function onHammer(event) {
                if (event.target === element[0].children[0]) {
                    var x = event.center.x - 120,
                        y = event.center.y - 213;

                    scope.boxMessage = '{y:' + y + '}';

                    element.children().css({
                        'top': y + 'px'
                    });
                }
            };
        }
    }
}

dashboard.directive('dragVert', [dragVert]);