module.exports = function (app) {

    app.get('/api/', function(req, res){
        res.json([{
            code: 404,
            message: "Path not found"
        }])
    });

    app.get('/api/*', function(req, res){
        res.json([{
            code: 404,
            message: "Path not found"
        }])
    });

    app.post('/api/*', function(req, res){
        res.json([{
            code: 404,
            message: "Path not found"
        }])
    });
}