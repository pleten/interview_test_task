const config = require('./config.json');
const Mocha = require('mocha');

// ES5 native `Array.prototype.forEach` is not async; since tests are executed asynchronously we're going to need an
// async version of `forEach`
let asyncForEach = async (arr, cb) => {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
    }
};

(async () => {
        await asyncForEach(config.tests, async testCase => {
            // Create our Mocha instance
            const mocha = new Mocha({
                timeout: testCase.timeout
            });

            // Since tests are executed asynchronously we're going to return a Promise here.
            return new Promise((resolve, reject) => {
                // By default `require` caches files, making it impossible to require the same file multiple times.
                // Since we want to execute the same tests against many browsers we need to prevent this behaviour by
                // clearing the require cache.
                mocha.suite.on('require', function (global, file) {
                    delete require.cache[file];
                });
                mocha.addFile(`${testCase.file}`);
                mocha.run()
                // Callback whenever a test fails.
                    .on('fail', test => reject(new Error(`Selenium test (${test.title}) failed.`)))
                    // When the test is over the Promise can be resolved.
                    .on('end', () => resolve());
            });
        });
})();
