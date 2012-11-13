
var mysql = require('mysql');

var host = process.env['DOTCLOUD_DB_MYSQL_HOST'] || 'localhost';
var port = process.env['DOTCLOUD_DB_MYSQL_PORT'] ||  '3306';
port = parseInt(port);
var user = process.env['DOTCLOUD_DB_MYSQL_LOGIN'] || 'root';
var pass = process.env['DOTCLOUD_DB_MYSQL_PASSWORD'] || 'root';

var db = mysql.createConnection({
  host     : host,
  user     : user,
  port     : port,
  password : pass,
  debug : true
});


// Connect to MySQL
db.connect(function(err) {
    console.log("What the fuck")
    if (err) throw err;

    // Create a db if needed
    db.query('CREATE DATABASE IF NOT EXISTS test', function(err) {
        if (err) throw err;
        // Create a table if needed
        db.query('CREATE TABLE IF NOT EXISTS test', function(err) {
            if (err) throw err;
            
            db.query('SELECT * FROM test', function(err, rows, fields) {
              console.log(rows);
            });
            
        });
    });

});