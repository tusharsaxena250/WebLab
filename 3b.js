var express = require('express');
var app = express();
var mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost', function(err, client) {
    if(!err){
        console.log("Connected...");
        app.use(express.static('public'));
        var db = client.db('voting');
        db.collection('vote').insert({party:'bjp', vote:0});
        db.collection('vote').insert({party:'congress', vote:0});
        db.collection('vote').insert({party:'nota', vote:0});

        app.get('/3b.html', function(req, res) {
            res.sendFile(__dirname+'/'+'3b.html');
        });
        app.get('/insert', function(req, res) {
            var party = req.query.party;
            console.log(party);
            var j = db.collection('vote').update({party:party}, {$inc:{vote:1}});
            console.log(j);
            res.end(JSON.stringify(req.query));
        });
        app.get('/display', function(req, res) {
            db.collection('vote').find().sort().toArray(function(err, data) {
                console.log(data);
                res.end(JSON.stringify(data));
            });
        });
        app.listen(3000);
    }
});