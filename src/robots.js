module.exports = function (app) {

    app.get('/robots.txt', function(req, res){
        res.end(`User-agent: *
Allow: /
Disallow: /robots.txt`)
    });
}