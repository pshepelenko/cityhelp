var express = require('express');
const { Client, Pool } = require('pg');

const pool = new Pool( {
    connectionString: 'postgres://vojoulbn:RLE2Hy73eFmGU2kOcH017REe5v5shWaa@batyr.db.elephantsql.com/vojoulbn',
    ssl: {
      rejectUnauthorized: false
    }
    }
);

var router = express.Router();


/* GET home page. */
router.get('/:id', function(req, res, next) {
    if (req.params.id == 'undefined') {
        return res.status(404).json({message: 'Picture ID is undefined'});
    } else {
                const fileName = req.params.id;    
                const path = __basedir + "/upload/";
                res.contentType('image/png');
                res.sendFile(path + fileName, (err) => {
                    if (err) {
                    res.status(500).send({
                        message: "File can not be downloaded: " + err,
                    });
                    }
                });   
                 
                return res.status(200);
                
            };   

        
    
});

router.get('/reports/:id', function(req, res, next) {
    if (req.params.id == 'undefined') {
        return res.status(404).json({message: 'Picture ID is undefined'});
    } else {
                const fileName = req.params.id;    
                const path = __basedir + "/upload/reports/";
                res.contentType('image/png');
                res.sendFile(path + fileName, (err) => {
                    if (err) {
                    res.status(500).send({
                        message: "File can not be downloaded: " + err,
                    });
                    }
                });   
                 
                return res.status(200);
                
    };   
    
});

module.exports = router;
