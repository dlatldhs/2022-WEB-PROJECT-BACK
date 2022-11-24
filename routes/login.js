const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/index.js');

router.use(logger);
router.get('/',(req,res) => {
    res.render('customers/login')
});

router.post('/',(req,res) => {
    sql = `SELECT email , password from customers where email = ${req.body.email}`;
    db.connection.query(sql, (err,results)=> {
        if (err) console.log(err);
        return res.send(results);
    });
});

function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;