function gravatar(md5) {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, el, attrs) {
            var email = attrs.email;
            var size = attrs.size * 1;
            var defaultImg = "img/default-avatar.png";
            var hash;

            attrs.$observe('email', function(val) {
                if (!val) {
                    scope.url = defaultImg;
                } else {
                    var hash = md5.createHash(val);
                    scope.url = "http://www.gravatar.com/avatar/" + hash + "?s=" + size + "&d=404";
                }
            });

            el.bind('error', function() {
                el.attr('src', defaultImg);
            });
        },
        template: '<img src="{{url}}" draggable="false">'
    }
}

main.directive('gravatar', ['md5', gravatar]);