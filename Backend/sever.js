

var mysql = require('mysql');
const express = require("express")
const http = require('http');

const app = express();
app.use(express.json());

let con ;
 function connectDB(){
    con = mysql.createConnection({
    host: "db4free.net",
    database: "mohit_db",
    user: "mohit_gupta",
    password: "midb@1234"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  
}






 function callUser() {

    var query = con.query('SELECT * from Users', function(err,result) {
      if(err) {
        console.log(err.toString());
        res.status(500).send(err.toString());
      } else {
        res.json(result);
        console.log(result)
      }
    });
  }

