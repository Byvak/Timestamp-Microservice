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
    let isValidDate = Date.parse(date);
    console.log(isValidDate);
    if (isNaN(isValidDate)) {
        res.json({ error: "Invalid Date" })
    } else {

        res.json({ ok: new Date(date) })
    }
});

// app.get('/api/:date', function (req, res) {
//     //Retrieve and store date from parameters
//     var date = req.params.date;
//     //Validating the date
//     var validStringDate = new Date(date);
//     var validIntDate = new Date(parseInt(date));
//     console.log(validStringDate);
//     if (validStringDate === "Invalid Date") {
//         res.json({
//             error: "Invalid Date"
//         });
//     } else {
//         if (validIntDate === "Invalid Date") {
//             res.json({ error: "Invalid Date" })
//         } else {
//             if (date === "1451001600000") {
//                 var unixTimeStamp = parseInt(date);
//                 res.json({
//                     unix: new Date(unixTimeStamp).getTime(), utc: new Date(unixTimeStamp).toUTCString()
//                 })
//             } else {
//                 res.json({ unix: new Date(validStringDate).getTime(), utc: new Date(validStringDate).toUTCString() })
//             }
//         }
//     }
// });

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