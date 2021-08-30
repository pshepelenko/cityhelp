var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
var multer  = require('multer');


const pool = new Pool( {
    connectionString: 'postgres://vojoulbn:RLE2Hy73eFmGU2kOcH017REe5v5shWaa@batyr.db.elephantsql.com/vojoulbn',
    ssl: {
      rejectUnauthorized: false
    }
    }
);

const DIR = './upload/';
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
        return res.status(404).json({message: 'Reward ID is undefined'});
    } else {
        const query = "SELECT * FROM rewards WHERE rewardid = '" + req.params.id + "';"  
        console.log(query);
        pool.query(query, (err, dbres) => {
            //if (err) throw err;
            for (let row of dbres.rows) {
                console.log(JSON.stringify(row));
            }
            return res.status(200).json(dbres.rows);
        })
    }
});

router.get('/', function(req, res, next) {
    const query = "SELECT * FROM rewards;" 
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        for (let row of dbres.rows) {
            console.log(JSON.stringify(row));
        }
        return res.status(200).json(dbres.rows);
    })
    
});

router.post('/create', upload.single('picture'), function(req, res, next) {
    console.log(req.file);
    console.log(req.body);
    //var port = normalizePort(process.env.PORT || '3000');
    pictureLink = req.protocol + '://' + req.get('host') + '/pictures/' + req.file.filename;
    
    const query = "INSERT INTO rewards (title, description, price, picturelink) VALUES ('" + req.body.title + "','" + req.body.description + "','" + req.body.price + "','" + pictureLink +  "');";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been created successfully'});
    })
    
});

router.post('/buy', function(req, res, next) {
    
    let query = "SELECT balance FROM users WHERE email = '" + req.body.userId + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        query = "SELECT price FROM rewards WHERE rewardid = '" + req.body.rewardId + "';";
        console.log(query);
        if (!dbres.rows[0].balance) {return res.status(404).json({message: 'No such user'});}
        pool.query(query, (err, dbres2) => {
            if (!dbres2.rows[0]) {return res.status(404).json({message: 'No such reward'});}
            if (dbres2.rows[0].price > dbres.rows[0].balance) {
                return res.status(403).json({message: 'Not enough money on the balance'});        
            };
            let remainder = dbres.rows[0].balance - dbres2.rows[0].price;
            query = "UPDATE users SET balance = ' " + remainder + "', rewards = array_append(rewards, " + req.body.rewardId + ") WHERE email = '" + req.body.userId + "';"
            console.log(query);
            pool.query(query, (err, dbres2) => {
                return res.status(200).json({message: 'A purchase has been made successfully'});
            });
        })    

        
    })
    
});

router.put('/update', function(req, res, next) {
    const query = "UPDATE rewards SET title = '" + req.body.title + "', description = '" + req.body.description + "', price = '" + req.body.price + "', picturelink = '" + req.body.picturelink + "'  WHERE rewardid = '" + req.body.rewardid + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Task has been started successfully'});
    })
    
});

router.delete('/:id', function(req, res, next) {
    const query = "DELETE FROM rewards WHERE rewardid = '" + req.params.id + "';";
    console.log(query);
    pool.query(query, (err, dbres) => {
        //if (err) throw err;
        return res.status(200).json({message: 'Reward has been deleted successfully'});
    })
    
});


router.get('/active/users/:userId', function(req, res, next) {
    
    if (req.params.userId == 'undefined') {
        return res.status(404).json({message: 'User ID is undefined'});
    } else {
       
                var query = "SELECT rewards FROM users WHERE email = '" + req.params.userId + "';"  
                console.log(query);
                var dbres = [];
                pool.query(query, (err, dbres) => {
                    if (err) throw err;
                    var secondQuery = "SELECT * FROM rewards WHERE ";
                    console.log(dbres.rows[0].rewards);
                    
                    for (let i = 0, len = dbres.rows[0].rewards.length; i < len-1; i++) {
                        secondQuery = secondQuery + "rewardid = '" + dbres.rows[0].rewards[i] + "' OR ";
                    }
                    if (dbres.rows[0].rewards.length > 0) {
                        secondQuery = secondQuery + "rewardid = '" + dbres.rows[0].rewards[dbres.rows[0].rewards.length-1] + "'";
                    } else {
                        return res.status(404).json({message: 'No active rewards'});
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
       
                var query = "SELECT rewards FROM users WHERE email = '" + req.params.userId + "';"  
                console.log(query);
                var dbres = [];
                pool.query(query, (err, dbres) => {
                    if (err) throw err;
                    var secondQuery = "SELECT * FROM rewards WHERE ";
                    console.log(dbres.rows[0].rewards);
                    
                    for (i = 0, len = dbres.rows[0].rewards.length; i < len-1; i++) {
                        secondQuery = secondQuery + "rewardid != '" + dbres.rows[0].rewards[i] + "' AND ";
                    }
                    if (dbres.rows[0].rewards.length > 0) { 
                        secondQuery = secondQuery + "rewardid != '" + dbres.rows[0].rewards[dbres.rows[0].rewards.length-1] + "'";
                    } else {
                        secondQuery = secondQuery + "1 ;";
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







module.exports = router;
