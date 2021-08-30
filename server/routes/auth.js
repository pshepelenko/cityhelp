const { query } = require('express');
var express = require('express');
const { Client } = require('pg');
var router = express.Router();

const client = new Client({
    connectionString: 'postgres://vojoulbn:RLE2Hy73eFmGU2kOcH017REe5v5shWaa@batyr.db.elephantsql.com/vojoulbn',
    ssl: {
      rejectUnauthorized: false
    }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  return res.status(200).json({ message: 'Welcome to Express API template' });
});
router.post('/login', function(req, res, next) {
    client.connect();
    let query = "SELECT name, surname, password, isadmin, balance FROM users WHERE email='" + req.body.login + "';";
    console.log(query);
        client.query(query, (err, dbres) => {
        //if (err) throw err;
        for (let row of dbres.rows) {
          console.log(JSON.stringify(row));
        }
        console.log('num_rows=' + dbres.rows.length);
        client.end();
        if (dbres.rows.length == 0) { res.sendStatus(403); } else {
            if (dbres.rows[0].password == req.body.password)
            {
                return res.status(200).json({
                    isAdmin: dbres.rows[0].isadmin,
                    name: dbres.rows[0].name,
                    surname: dbres.rows[0].surname,
                    balance: dbres.rows[0].balance,
                });
            } else {
                res.sendStatus(403);
            }
        }
    });
});

router.post('/register', function(req, res, next) {
    client.connect();
    let query = "SELECT name FROM users WHERE email='" + req.body.email + "';";
    console.log(query);
    client.query(query, (err, dbres) => {
        //if (err) throw err;
        for (let row of dbres.rows) {
          console.log(JSON.stringify(row));
        }
        console.log('num_rows=' + dbres.rows.length);
        if (dbres.rows.length != 0) { 
            client.end();
            res.sendStatus(403); 
        } else {
            query = "INSERT INTO users (name, surname, email, password, salt, isadmin) VALUES ('" + req.body.name + "','" + req.body.surname + "','" + req.body.email + "','" + req.body.password + "','aaa','false');";
            console.log(query);
            client.query(query, (err, dbres1) => {
                if (err) throw err;
                client.end();
                return res.status(200).json({message: 'User has been created successfully'});
            })
        }
            
    });
    
});

module.exports = router;
