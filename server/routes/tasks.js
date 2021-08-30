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
        return res.status(404).json({message: 'Task ID is undefined'});
    } else {
       
                const query = "SELECT * FROM tasks WHERE taskid = '" + req.params.id + "';"  
                var dbres = [];
                pool.query(query, (err, dbres) => {
                    //if (err) throw err;
                  
                    return res.status(200).json(dbres.rows);
                });
            };   

        
    
});

router.get('/', function(req, res, next) {
    
    const query = "SELECT * FROM tasks;" 
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        for (let row of dbres.rows) {
            console.log(JSON.stringify(row));
        }
        
        return res.status(200).json(dbres.rows);
    })
    
});

router.get('/active/users/:userId', function(req, res, next) {
    
    if (req.params.userId == 'undefined') {
        return res.status(404).json({message: 'User ID is undefined'});
    } else {
       
                var query = "SELECT tasks_active FROM users WHERE email = '" + req.params.userId + "';"  
                console.log(query);
                var dbres = [];
                pool.query(query, (err, dbres) => {
                    if (err) throw err;
                    var secondQuery = "SELECT * FROM tasks WHERE ";
                    console.log(dbres.rows[0].tasks_active);
                    for (let i = 0, len = dbres.rows[0].tasks_active.length; i < len-1; i++) {
                        secondQuery = secondQuery + "taskid = '" + dbres.rows[0].tasks_active[i] + "' OR ";
                    }
                    if (dbres.rows[0].tasks_active.length > 0) {
                        secondQuery = secondQuery + "taskid = '" + dbres.rows[0].tasks_active[dbres.rows[0].tasks_active.length-1] + "'";
                    } else {
                        return res.status(404).json({message: 'No active tasks'});
                    }
                    console.log(secondQuery);
                    var secondDbres = [];
                    pool.query(secondQuery, (err, secondDbres) => {
                        if (err) throw err;
                        return res.status(200).json(secondDbres.rows);
                    } )
                    
                });
    };   
});

router.get('/available/users/:userId', function(req, res, next) {
    
    if (req.params.userId == 'undefined') {
        return res.status(404).json({message: 'User ID is undefined'});
    } else {
       
                var query = "SELECT tasks_active, tasks_finished FROM users WHERE email = '" + req.params.userId + "';"  
                console.log(query);
                var dbres = [];
                pool.query(query, (err, dbres) => {
                    if (err) throw err;
                    var secondQuery = "SELECT * FROM tasks WHERE ";
                    console.log(dbres.rows[0].tasks_active);
                    for (let i = 0, len = dbres.rows[0].tasks_finished.length; i < len; i++) {
                        secondQuery = secondQuery + "taskid != '" + dbres.rows[0].tasks_finished[i] + "' AND ";
                    }
                    for (i = 0, len = dbres.rows[0].tasks_active.length; i < len-1; i++) {
                        secondQuery = secondQuery + "taskid != '" + dbres.rows[0].tasks_active[i] + "' AND ";
                    }
                    if (dbres.rows[0].tasks_active.length > 0) { 
                        secondQuery = secondQuery + "taskid != '" + dbres.rows[0].tasks_active[dbres.rows[0].tasks_active.length-1] + "'";
                    } else {
                        secondQuery = secondQuery.slice(0,secondQuery.length-5) + ";";
                    }

                    console.log('2query = ' + secondQuery);    
                    var secondDbres = [];
                    pool.query(secondQuery, (err, secondDbres) => {
                        if (err) throw err;
                        return res.status(200).json(secondDbres.rows);
                    } )
                    
                });
    };   
});



router.post('/create', function(req, res, next) {
    const query = "INSERT INTO tasks (title, description, category, reward, status, creator, creationdate, reportsunchecked, reportstotal, paths) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.category + "','" + req.body.reward + "','Не запущено','" + req.body.creator + "','" + req.body.creationdate + "', 0, 0, '" + req.body.finalPaths + "');";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been created successfully'});
    })
    
});

router.post('/start', function(req, res, next) {
    const query = "UPDATE tasks SET status = 'В работе' WHERE taskid = '" + req.body.taskID + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        
        return res.status(200).json({message: 'Task has been started successfully'});
    })
    
});

router.post('/stop', function(req, res, next) {
    const query = "UPDATE tasks SET status = 'Не запущено' WHERE taskid = '" + req.body.taskID + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been stopped successfully'});
    })
    
});

router.post('/subscribe', function(req, res, next) {
    const query = "UPDATE users SET tasks_active = array_append(tasks_active, " + req.body.taskId + ") WHERE email = '" + req.body.userId + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been added to subscription successfully'});
    })
    
});

router.post('/unsubscribe', function(req, res, next) {
    const query = "UPDATE users SET tasks_active = array_remove(tasks_active, " + req.body.taskId + ") WHERE email = '" + req.body.userId + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been removed from subscription successfully'});
    })
    
});


module.exports = router;
