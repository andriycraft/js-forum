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

const names = [
    "best-forum-ever",
    "cat-talk",
    "dog-talk",
    "everything-is-good"
]
let namegenerator = names[Math.floor(Math.random() * names.length)]

module.exports = function (app) {

    app.get('/configure', function(req, res){
        namegenerator = names[Math.floor(Math.random() * names.length)]
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

        h2, h3, p {
            font-family: 'Roboto', sans-serif;
        }

        h3 {
            margin-top: 30px;
        }

        input {
            padding: 15px;
        }
        
        .next {
            padding: 15px;
            background-color: #000;
            border: 1px solid gray;
            color: white;
        }
        </style>
        <script>
        function check() {
            let desc = document.getElementById('desc').value;
            let name = document.getElementById('name').value;
            location.href = '../checkfiels?desc=' + desc + '&name=' + name
        }
        </script>
        </head>
        <body>
            <center>
                <h2 class="title">What is your forum name?</h2>
                <br>
                <input id="name" type="label" placeholder="Ex: ${namegenerator}" required max="50">
                <p style="color:red">This field is required</p>
                </input>
                <br>
                <h3>What is your forum description? (optional)</h3>
                <input id="desc" type="label" placeholder="Only description" required max="50">
                </input>
                <br>
                <br><br><br>
                <button type="submit" onclick="check()" class="next">
                <p>Done!</p>
                </button>
                <br>
            </center>
        </body>`)  
    })
}
