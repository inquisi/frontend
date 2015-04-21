(function() {
	resources.factory('Course', ['$resource',
		function($resource) {
			return $resource('/courses/:courseId', {}, {
				query: {
					isArray: false
				}
			});
		}
	]);
})();