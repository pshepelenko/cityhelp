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


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId/tasks/:taskId', function(req, res, next) {
  if (req.params.userId == 'undefined') {
    return res.status(404).json({message: 'User ID is undefined'});
  };
  if (req.params.taskId == 'undefined') {
    return res.status(404).json({message: 'Task ID is undefined'});
  } else {
   
            const query = "SELECT tasks_active FROM users WHERE email = '" + req.params.userId + "';"  
            var dbres = [];
            pool.query(query, (err, dbres) => {
                //if (err) throw err;
                var res1 = dbres.rows[0].tasks_active.includes(parseInt(req.params.taskId));
                return res.status(200).json({status: res1});
            });
        };   

});

module.exports = router;
