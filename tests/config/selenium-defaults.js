module.exports = {
	baseURL: 'https://selenium-release.storage.googleapis.com',
	version: '3.12.0',
	drivers: {
		chrome: {
			version: '2.39',
			arch: process.arch,
			baseURL: 'https://chromedriver.storage.googleapis.com',
		},
		firefox: {
			version: '0.13.0',
			arch: process.arch,
			baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
		},
		ie: {
			version: '3.0.0',
			arch: process.arch,
			baseURL: 'https://selenium-release.storage.googleapis.com',
		},
	},
};
