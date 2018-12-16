const _ = require('lodash');

module.exports = function(errors) {
	const result = {};
	_.forEach(errors, function(val, key) {
		if(val.message === 'Invalid unique') {
			switch (val.path) {
				case 'email':
					result[key] = 'Данный E-Mail уже используется'
					break;
				case 'username':
					result[key] = 'Данное имя пользователя уже используется'
					break;
			
				default:
					break;
			}
		}
	})
	return result;
}