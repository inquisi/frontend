// window.getService = function(serviceName) {
//     return $injector.get(serviceName);
// };

beforeEach(function() {
    // var AuthService = getService('AuthService');
    // console.log(AuthService)
    // spyOn(AuthService, 'authenticated').and.returnValue(true);

    module('inquisi', function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept()
    });
});