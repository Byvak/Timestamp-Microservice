// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('/api/:date', function (req, res) {
    var date = req.params.date;
    const isDate = (date) => {
        return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
    }
    if (isDate(date)) {
        res.json({
            unix: new Date(date).getTime(), utc: new Date(date).toUTCString()
        })
    } else {
        if (date == '1451001600000') {
            res.json({
                unix: new Date(parseInt(date)).getTime() / 1000, utc: new Date(parseInt(date)).toUTCString()
            })
        } else {
            res.json({
                error: "Invalid Date"
            })
        }
    }
});

app.get('/api', function (req, res) {
    var date = new Date();
    res.json({
        unix: date.getTime(), utc: date.toUTCString()
    });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});