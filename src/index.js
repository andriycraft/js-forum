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

    app.get('/', function (req, res) {
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
                <img style="width: 150px; height: 150px;" src="http://cdn.onlinewebfonts.com/svg/img_118367.png" alt="Setup icon from onlinewebfonts.com">
                <br><br>
                <h2 class="title">Welcome to JS-Forums Setup!</h2>
                <h3 class="sub">Your forum is not configured yet!</h3>
                <br>
                <button onclick="location.href='./softwarelicense'" class="next">
                <p>Ok, let me setup it!</p>
                </button>
                <br>
                <br>
                <p style="color: gray">(Version: 1.0.0, Setup icon from onlinewebfonts.com)</p>
            </center>
        </body>
        `);
        }
    });
}
