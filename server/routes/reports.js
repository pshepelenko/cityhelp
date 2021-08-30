
var express = require('express');

var router = express.Router();
var multer  = require('multer');
const { Pool } = require('pg');

const pool = new Pool( {
    connectionString: 'postgres://vojoulbn:RLE2Hy73eFmGU2kOcH017REe5v5shWaa@batyr.db.elephantsql.com/vojoulbn',
    ssl: {
      rejectUnauthorized: false
    }
    }
);

const DIR = './upload/reports/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.toLowerCase().split(' ').join('-'));
    }
});
var upload = multer({ 
    storage: storage,
    limits: { fileSize: '50MB' },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
         } else {
            cb(null, false);
            return cb(new Error('File types allowed .jpeg, .jpg and .png!'));
        }
    }
});


/* GET home page. */
router.get('/:id', function(req, res, next) {
    if (req.params.id == 'undefined') {
        return res.status(404).json({message: 'Report ID is undefined'});
    } else {
        let query = "SELECT * FROM reports WHERE reportid = '" + req.params.id + "';"  
        console.log(query);
        pool.query(query, (err, dbres) => {
            //if (err) throw err;
            for (let row of dbres.rows) {
                console.log(JSON.stringify(row));
            }
            if (dbres.rows.length == 0) {return res.status(404).json({message: 'No such report'});}
            let resultBufer = dbres.rows[0];
            query = "SELECT title, reward, paths FROM tasks WHERE taskid = '" + dbres.rows[0].taskid + "';"
            console.log(query);
            pool.query(query, (err, dbres1) => {
                //if (err) throw err;
                for (let row of dbres1.rows) {
                    console.log(JSON.stringify(row));
                }
                resultBufer.taskTitle = dbres1.rows[0].title;
                resultBufer.reward = dbres1.rows[0].reward;
                resultBufer.paths = dbres1.rows[0].paths;
                
                return res.status(200).json(resultBufer);
            })
        })
    }
});

router.get('/', function(req, res, next) {
    
    const query = "SELECT * FROM reports;" 
    console.log(query);
    pool.query(query, (err, dbres) => {
        if (err) console.log(err);
        for (let row of dbres.rows) {
            console.log(JSON.stringify(row));
        }
        
        return res.status(200).json(dbres.rows);
    })
    
});

router.get('/tasks/:id', function(req, res, next) {
    if (req.params.id == 'undefined') {
        return res.status(404).json({message: 'Task ID is undefined'});
    } else {
        
        let query = "SELECT * FROM reports WHERE taskid = '" + req.params.id + "';"  
        console.log(query);
        pool.query(query, (err, dbres) => {
            //if (err) throw err;
            for (let row of dbres.rows) {
                console.log(JSON.stringify(row));
            }
            if (dbres.rows.length == 0) {return res.status(404).json({message: 'No reports to show'});}
            return res.status(200).json(dbres.rows);
            })
    }
});

router.get('/users/:userId', function(req, res, next) {
    if (req.params.userId == 'undefined') {
        return res.status(404).json({message: 'User ID is undefined'});
    } else {
        
        let query = "SELECT * FROM reports WHERE userid = '" + req.params.userId + "';"  
        console.log(query);
        pool.query(query, (err, dbres) => {
            //if (err) throw err;
            for (let row of dbres.rows) {
                console.log(JSON.stringify(row));
            }
            if (dbres.rows.length == 0) {return res.status(404).json({message: 'No reports to show'});}
            return res.status(200).json(dbres.rows);
            })
    }
});


router.post('/create', upload.array('uploads',15), function(req, res, next) {
    console.log(req.files);
    console.log(req.body);
    //var port = normalizePort(process.env.PORT || '3000');
    var pictureLinks = []; 
    for (let file of req.files) {
        pictureLinks.push(req.protocol + '://' + req.get('host') + '/pictures/reports/' + file.filename)
    }
    //pictureLink = req.protocol + '://' + req.get('host') + '/pictures/' + req.files[0].filename;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    var query = "INSERT INTO reports (taskid, description, userid, status, creationdate,  uploads) VALUES ('" + req.body.taskId + "','" + req.body.description + "','" + req.body.userid + "', 'На обработке', '" + year + "-" + month + "-" + date + "', '{" ;
    for (picture of pictureLinks) {
        query = query + picture + ",";
    }
    query = query.slice(0,query.length-1);
    query = query + "}');";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        var secondQuery = "UPDATE users SET tasks_active = array_remove(tasks_active," + req.body.taskId + "), tasks_finished = array_append(tasks_finished, " + req.body.taskId + ") WHERE email = '" + req.body.userid + "';"
        console.log(secondQuery);
    
        pool.query(secondQuery, (err, seconsDbres) => {
            return res.status(200).json({message: 'Report has been created successfully'});
        })    
    })
    
    //return res.status(200).json({message: 'Report has been created successfully'});
});



router.post('/delete', function(req, res, next) {
    const query = "DELETE FROM reports WHERE reportId = '" + req.body.reportId + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        var secondQuery = "UPDATE users SET tasks_active = array_append(tasks_active," + req.body.taskId + "), tasks_finished = array_remove(tasks_finished, " + req.body.taskId + ") WHERE email = '" + req.body.userId + "';"
        console.log(secondQuery);
        pool.query(secondQuery, (err) => {
            return res.status(200).json({message: 'Task has been deleted successfully'});
        })    
    })
    
});


router.post('/approve', function(req, res, next) {
    const query = "UPDATE reports SET status = 'Подтвержден' WHERE reportId = '" + req.body.reportId + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been started successfully'});
    })
    
});

router.post('/reject', function(req, res, next) {
    client.connect();
    const query = "UPDATE reports SET status = 'Отклонен' WHERE reportId = '" + req.body.reportId + "';";
    console.log(query);
    client.query(query, (err, dbres) => {
        //if (err) throw err;
        client.end();
        return res.status(200).json({message: 'Task has been stopped successfully'});
    })
    
});


module.exports = router;
