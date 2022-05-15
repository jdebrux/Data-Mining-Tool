const mysql = require('mysql');

const dbConn = mysql.createConnection({
    host : 'localhost',
    user : 'teamb028',
    password : 'Lqg9XKAAra',
    database : 'teamb028'
});

dbConn.connect(function(err){
    if (err) throw err;
    console.log("Database connected.");
});

module.exports = dbConn;