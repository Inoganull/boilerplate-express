let express = require('express');
let app = express();
require('dotenv').config();

const bodyParser = require('body-parser');

console.log("Hello World");

// app.get("/", function(req, res) {
//     res.send("Hello Express");
// });

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html");
});

// app.use("/public", express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
},
(req, res) => {
    res.send({"time": req.time});
}
);

app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "Hello json".toUpperCase()});
    }
    else {
        res.json({"message": "Hello json"});
    }
});

app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
        "echo": word
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.route("/name")
    .get((req, res) => {
        const { first: firstName, last: lastName } = req.query;
        res.json({ "name": `${firstName} ${lastName}` });
    })
    .post((req, res) => {
        var string = req.body.first + " " + req.body.last;
        res.json({ "name": string });
    });




























 module.exports = app;
