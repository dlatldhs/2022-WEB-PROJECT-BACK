const express = require("express");
const mysql = require('mysql');
const db = require("./db/index.js");
const app = express()
const nunjucks = require('nunjucks');

// require
const userRouter = require('./routes/user');
app.set('view engine', 'ejs')
nunjucks.configure('views',{express:app});

app.use(express.urlencoded({extended: true}));

app.use('/user',userRouter); // 경로에 해당하는 거 사용
const session = {};

app.get('/',(req,res) => {
    if ( req.headers.cookie ) {
        const[,privateKey] = req.headers.cookie.split('=');
        const userInfo = session[privateKey];
        console.log('로그인 완료')
        return res.render('user/user.ejs',{
            isLogin:true,
            userInfo,
        });
    } else {
       return res.render('index.ejs',{text: "world" });
    }
})

app.listen(3000)