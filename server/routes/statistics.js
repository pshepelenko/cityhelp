var express = require('express');

var router = express.Router();

const { Client, Pool } = require('pg');

const pool = new Pool( {
    connectionString: 'postgres://vojoulbn:RLE2Hy73eFmGU2kOcH017REe5v5shWaa@batyr.db.elephantsql.com/vojoulbn',
    ssl: {
      rejectUnauthorized: false
    }
    }
);



/* GET home page. */
router.get('/', function(req, res, next) {
    
    const query = "SELECT * FROM statistics LIMIT 9;" 
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        for (let row of dbres.rows) {
            console.log(JSON.stringify(row));
        }
        
        return res.status(200).json(dbres.rows);
    })
    
});


module.exports = router;
