let config = {
	baseUrl: '',
};

function setupConfig() {
	config.baseUrl = '';
	config.users = {
		loginUser: {
			email: 'ssls.automation+5@gmail.com',
			password: '123456'
		}
	};
	config.userDetails = {
		name: 'Vasya Pupkin',
		email: 'ssls.automation+5@gmail.com',
		password: '*****',
		phone: '+380 57123456789',
		address: 'Diagon alley 2, Misto, Uryupinsk 612120, Ukraine',
	}
}

exports.setupConfig = setupConfig;
exports.config = config;
