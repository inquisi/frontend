function dashboardController($scope) {
    $scope.open = false;
    $scope.logoSmall = true;

    $scope.toggleLogo = function() {
        if ($scope.logoSmall) {
            $scope.logoSmall = false;
        } else {
            $scope.logoSmall = true;
        }
    }

    $scope.openMenu = function() {
        if ($scope.open) {
            return;
        } else {
            $scope.open = true;
        }
    }

    $scope.closeMenu = function() {
        if (!$scope.open) {
            return;
        } else {
            $scope.open = false;
        }
    }

    $scope.toggleMenu = function() {
        if ($scope.open) {
            $scope.closeMenu();
        } else {
            $scope.openMenu();
        }
    }

    $scope.reverse = function(array) {
        var copy = [].concat(array);
        return copy.reverse();
    }


    $scope.courses = [{
        title: 'CS 141',
        id: '1234'
    }, {
        title: 'CS 292',
        id: '1235'
    }];

    $scope.addCourse = function() {
        $scope.courses.push({
            title: 'New Course',
            id: '1236'
        });
    }
}

dashboard.controller('dashboardController', ['$scope', dashboardController]);