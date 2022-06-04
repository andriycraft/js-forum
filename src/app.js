const server = require('express');
const app = server();
const name = "js-forum";
const version = "1.0.0"
const config = require("../config.json")
const fs = require('fs')
require('../src/index.js')(app);
require('../src/robots.js')(app);

try {
    console.debug(config)
} catch (e) {
    console.error("Failed to read config, exiting...")
    process.exit(-1)
}

app.use('*', function (req, res, next) {
    console.log(`Request: ${Date()}: ${req.socket.remoteAddress} - ${req.method} ${req.url}`)
    next()
})

app.get('*', function (req, res) {
    res.statusCode = 404;

    fs.readFile('./public_html/404.html', 'utf8', function (err, data) {
        if (err) {
            console.warn("Failed to read 404 page!")
            console.warn(e)
            return;
        }
        res.end(data.replace("${name}", name).replace("${version}", version));
    });
})


try {
    app.listen(config.port)
} catch (e) {
    console.error(`Failed to listen!`)
    console.error(e)
    process.exit(-1)
}