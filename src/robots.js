module.exports = function (app) {

    app.get('/robots.txt', function(req, res){
        res.end(config.robots_txt_content)
    });

}
