function disableValidators () {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			var validator = function(value) {
				return value;
			};

			// replace the email validators
			ctrl.$validators = {
				email: validator
			};
		}
	}
}

login.directive('disableValidators', disableValidators);