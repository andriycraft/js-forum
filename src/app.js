const server = require('express');
const app = server();
const name = "js-forum";
const version = "1.0.0"
const fs = require('fs')

try {
    const config2 = require("../config.json")
} catch (e) {
    console.error("Failed to read config, exiting...")
    process.exit(-1)
}
const config = require("../config.json")


app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status = 500;
    fs.readFile('./public_html/500.html', 'utf8', function (err, data) {
        if (err) {
            console.warn("Failed to read 500 error page!")
            console.warn(e)
            return;
        }
        res.end(data.replace("${name}", name).replace("${version}", version));
    });
});
  

try {
    const lang2 = require("../lang.json")
} catch (e) {
    console.error("Failed to read lang files, exiting...")
    process.exit(-1)
}
const lang = require("../lang.json")



try {
    require('../src/index.js')(app, config, lang);
    require('../src/robots.js')(app, config);
    require('../src/license.js')(app);
    require('../src/api.js')(app);
    require('../src/configure.js')(app);
} catch (e) {
    console.error('Error in module: ')
    console.error(e.stack)
}

app.use('*', function (req, res, next) {
    console.log(`Request: ${Date()}: ${req.socket.remoteAddress} - ${req.method} ${req.url}`)
    next()
})

app.get('*', function (req, res) {
    res.statusCode = 404;

    fs.readFile('./public_html/404.html', 'utf8', function (err, data) {
        if (err) {
            console.warn("Failed to read 404 error page!")
            console.warn(e)
            return;
        }
        res.end(data.replace("${name}", name).replace("${version}", version));
    });
})


try {
    app.listen(config.port)
    console.log(`Listening on port ${config.port}`)
    console.log(`You can open your forums at http://localhost:${config.port}/`)
} catch (e) {
    console.error(`Failed to listen on port ${config.port}!`)
    console.error(e)
    process.exit(-1)
}
