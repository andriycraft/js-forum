const fs = require('fs')
const config = require('../config.json')
const lang = require('../lang.json')

let headerinclude = '<!-- ERROR: No header include found! -->'
fs.readFile('./public_html/__headerinclude.html', 'utf8', function (err, data) {
    if (err) {
        console.warn("Failed to read header include!")
        console.warn(e)
        return;
    }
    headerinclude = data.replace("[headerstart]", "").replace("[headerend]", "").replace("[forumname]", config.forumname).replace("[lang->welcome_to]", lang.welcome_to);
});

module.exports = function (app) {

    app.get('/softwarelicense', function(req, res){
        if (req.query.answer == 'no') {
            res.statusCode = 403;
            res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>403 Forbidden</title>
            </head>
            <body>
                <center>
                    <h1>403 Forbidden</h1>
                    <p>License was denied</p>
                    <a href="../softwarelicense">I want to change my answer</a>
                    <hr>
                    <p>js-forum/1.0.0</p>
                </center>
            </body>
            </html>`)
            return;
        }
        res.end(`
        <!DOCTYPE HTML>
        <head>
        ${headerinclude}
        <style>
        * {
            padding: 0;
            margin: 0;
        }
        center {
            margin-top: 10%;
        }

        h2, h3 {
            font-family: 'Roboto', sans-serif;
        }

        h3 {
            margin-top: 30px;
        }

        .sub {
            color: gray;
        }

        .next {
            padding: 15px;
            background-color: #000;
            border: 1px solid gray;
            color: white;
        }
        </style>
        </head>
        <body>
            <center>
                <h2 class="title">Do you accept the license?</h2>
                <br>
                <button onclick="location.href='./api/get_jsforum_license'" class="next">
                <p>Show me the license!</p>
                </button>
                <br><br><br>
                <div class="yesnobuttons">
                <button onclick="location.href='./configure'" class="next">
                <p>Yes!</p>
                </button>
                <button onclick="location.href='./softwarelicense?answer=no'" class="next">
                <p>No!</p>
                </button>
                </div>
                <br>
            </center>
        </body>`)  
    })

    app.get('/api/get_jsforum_license', function(req, res){
        res.end(`
MIT License

Copyright (c) 2022 andriycraft

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        `)
    });
}