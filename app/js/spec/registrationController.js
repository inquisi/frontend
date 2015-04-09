describe('registrationController', function() {

    var $rootScope,
        $httpBackend,
        $q,
        $controller;

    beforeEach(function() {
        module('inquisi');
        inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $q = $injector.get('$q');
            $controller = $injector.get('$controller');
        });
    });

    describe(Registration, function() {
        it('should post the user object to the server', function() {
            $httpBackend.expectPOST('/register', JSON.stringify(userHash)).respond(200, '');
        });
    });

});