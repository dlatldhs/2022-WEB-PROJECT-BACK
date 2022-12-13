const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../db/index.js');
const session = {};
const {userList} = require('../model/user.js');

router.use(logger);

router.get('/login',(req,res) => {
    if ( req.headers.cookie ) {
        console.log('/user/login 에 로그인 되어있는 상태')
        const [,privateKey] = req.headers.cookie.split('=');
        delete session[privateKey];
        res.setHeader('Set-Cookie', 'connect.id=delete; Max-age=0; path=/');
        res.redirect('/');
    } else if ( !(req.headers.cookie) ) {
        console.log('/user/login 에 로그인 되어있는 상태의 반대')
        // return res.redirect('/users/index.ejs?=로그인해주세요');
        return res.render('user/login');
    }
});

router.post('/login',(req,res) => {
    const {id,pwd} = req.body;
    const [user] = userList.filter((v)=>v.id === id && v.pw === pwd);
    if ( user ) {
        const privateKey = Math.floor(Math.random()*1000000000);
        session[privateKey] = user;
        console.log(session);
        res.setHeader('Set-Cookie',`connect.id=${privateKey};path=/`);
        res.send(`
        <script>
            alert('로그인이 완료되었습니다!!!');
            location='/?id=${id}';
        </script>
        `)
        // res.redirect(`/?id=${id}`);
    } else {
        // res.redirect('/user/login?msg=NotFound');
        return res.send(`
            <script>
            alert('등록되지 않은 회원입니다.');
            location='/user/login'
            </script>`);
    }
});

router.get('/customer',(req,res)=>{
    return res.render('user/customer');
});

router.post('/customer',(req,res)=>{
    const sql =`insert into customers(email,password,name,address) VALUES('${req.body.email}','${req.body.pwd}','${req.body.c_name}','${req.body.address}')`
    db.connection.query(sql);
    return res.render('user/customer');
})

router.post('/logout',(req,res)=>{
    console.log(res.session);
    let test = req.headers.cookie
    console.log(test);
    res.clearCookie(test);
    return res.redirect('/')
})

function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;

//    sql = `SELECT email , password from customers where email = ${req.body.email}`;
//    db.connection.query(sql, (err,results)=> {
//        if (err) console.log(err);
//        return res.send(results);
//    });