/* Express quick setup */
var express = require('express');
var app = express();

/* mysql setup */
var mysql = require('mysql');

var host = process.env['DOTCLOUD_DB_MYSQL_HOST'] || 'localhost';
var port = process.env['DOTCLOUD_DB_MYSQL_PORT'] ||  3306;
port = parseInt(port);
var user = process.env['DOTCLOUD_DB_MYSQL_LOGIN'] || 'root';
var pass = process.env['DOTCLOUD_DB_MYSQL_PASSWORD'] || 'root';

var db = mysql.createConnection({
  host     : host,
  user     : user,
  port     : port,
  password : pass
});

app.get("/", function(req, res){
    var html = '<div id="content" data-stack="node" data-appname="' + process.env['DOTCLOUD_PROJECT'] + '">';
    html += 'Hello World, from Express!';
    html += '<script type="text/javascript" src="https://helloapp.dotcloud.com/inject.min.js"></script>';

    db.query('SELECT * FROM test', function(err, rows, fields) {
        res.send(html);
    });
});

// Connect to MySQL
db.connect(function(err) {
    if (err) throw err;

    // Create a db if needed
    db.query('CREATE DATABASE IF NOT EXISTS test', function(err) {
        if (err) throw err;
        // Connect to the DB test
        db.query('USE test', function(err){
            if (err) throw err;
            // Create a table if needed
             db.query('CREATE TABLE IF NOT EXISTS test', function(err) {
                app.listen(8080);
            });
            
        });
    });
});