function coursesController($scope, $modal) {
    $scope.openCourseOpts = function(course) {

        var modalInstance = $modal.open({
            windowTemplateUrl: 'states/partials/menu.html',
            templateUrl: 'states/partials/courseOpts.html',
            controller: 'openCourseOptsInstanceCtrl',
            backdropClass: 'menu-backdrop',
            resolve: {
                course: function() {
                    return course;
                }
            }
        });

        modalInstance.result.then(function(value) {
            console.log(value)
        }, function() {});
    }

    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}

dashboard.controller('coursesController', ['$scope', '$modal', coursesController]);