describe('anonymousController', function() {
    var $scope,
        $state,
        $httpBackend,
        $rootScope,
        $templateCache;

    beforeEach(function() {
        module('anonymous', function($provide) {
            $provide.value('session', {
                status: "failure",
                message: "Session not found",
                data: {}
            });
        });

        inject(function($controller, _$state_, _$httpBackend_, _$rootScope_, _$templateCache_) {
            $state = _$state_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $templateCache = _$templateCache_;
            spyOn($state, 'go').and.stub;

            $controller('anonymousController', {
                $scope: $scope,
                $state: $state,
                $stateParams: {
                    sessionToken: '123abc'
                }
            });
        });
    });

    it('should redirect to anonymous.404 if api response indicates incorrect session token', function() {
        $httpBackend.expectGET('http://localhost:3000/sessions?anonymous=true').respond(200, {});
        $templateCache.put('states/anonymous/index.html', '');
        $templateCache.put('states/anonymous/404.html', '');

        expect($state.go).toHaveBeenCalledWith('anonymous-404', {
            sessionToken: "123abc"
        });
    });

});