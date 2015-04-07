describe('validationController', function() {

    var scope;

    beforeEach(function() {
        module('inquisi');
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller("validationController", {
                $scope: scope
            });
        });
    });

    describe("Registration", function() {
        it("should set role to student by default", function() {
            expect(scope.user.role).not.toBe(null);
            expect(scope.user.role).toBe("student");
        });

    });
});

// it('should catch invalid emails', function() {

// });

// it('should pass valid emails through', function() {

// });

// it('should redirect users to the dashboard upon submitting a valid form', function() {

// });