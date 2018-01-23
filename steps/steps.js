var fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data, 'base64'));
    stream.end();
}



this.makeScreen = function (img) {
    browser.takeScreenshot().then(function (png) {
        writeScreenShot(png, './screens/' + img + '.png');
    });
        
    };  
// };
