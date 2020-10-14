const { table } = require("console");
var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DATA
var tables = [];

var waitlist = [];

//Load pages
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

app.get("/api/tables/:tables", function (req, res) {
    var chosen = req.params.tables;

    for (var i = 0; i < table.length; i++) {
        if (chosen === table[i].customerName) {
            return res.json(table[i]);
        }
    }
    return res.json(false);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

app.post("/api/tables", function (req, res) {
    var newReservation = req.body;
    //newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    //console.log(newReservation);
    if (tables.length < 5) {
        tables.push(newReservation);
        res.json(newReservation);
    }else{
        res.json(false);
    }
    
});

app.post("/api/waitlist", function (req, res) {
    var newReservation = req.body;
    //newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
    console.log(newReservation);
    waitlist.push(newReservation);
    res.json(newReservation);    
});
//POST To database
app.listen(PORT, () => {
    console.log(PORT);
});