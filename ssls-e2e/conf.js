exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['./tests/authorization-spec.js', './tests/my-profile-spec.js', './tests/home-spec.js'],
    capabilities: {
      'browserName': 'chrome',
      'chromeOptions': {
        'args': ['--start-maximized']
      },
    }
  };