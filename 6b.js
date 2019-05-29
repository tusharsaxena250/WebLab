var express = require('express');
var app = express();

app.get('/6bindex.html', function(req, res) {
    res.sendFile(__dirname+'/6bindex.html');
});
app.get('/6bcse.html', function(req, res) {
    res.sendFile(__dirname+'/6bcse.html');
});
app.get('/6bise.html', function(req, res) {
    res.sendFile(__dirname+'/6bise.html');
});

app.listen(3000);