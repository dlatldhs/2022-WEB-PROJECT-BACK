const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/index.js');

router.use(logger);

router.get('/',(req,res) => {
//    db.connection.query(`SELECT * FROM CUSTOMERS`,(err,results) => {
//        if (err) console.log(err);
//        return res.send(results)
//    })
    res.render('customers/customer');
});

router.post('/',(req,res) => {
    const sql =`insert into customers(email,password,name,address) VALUES('${req.body.email}','${req.body.pwd}','${req.body.c_name}','${req.body.address}')`
    db.connection.query(sql);
    res.render('customers/customer');
})
function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;