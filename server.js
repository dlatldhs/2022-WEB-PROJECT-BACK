const express = require("express");
const mysql = require('mysql');
//const db = require("./db/index.js");
const nunjucks = require('nunjucks');
// const db = require("./db/index.js");
const app = express()
const port = 3001;
// require
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
const { response } = require("express");

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}`));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use('/user',userRouter); // 경로에 해당하는 거 사용
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'gomirang',
})
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

app.get('/product/:id', function (req, res) {
    db.query("select * from funding_product", function(err, rows, fields){
        const product = rows;
        const products = product.find(c => c.funding_id == parseInt(req.params.id));
        res.send(products)
    })
})

app.get('/reward/:id', function(req, res){
    db.query("select * from reward", function(err, rows, fields){
        const reward = rows;
        const rewards = reward.find(c => c.funding_id == parseInt(req.params.id));
        res.send(rewards)
    })

})

app.get('/orderlist/:id', function(req, res){
    db.query("select * from user_order_funding", function(err, rows, fields){
        const order = rows;
        const orders = order.find(c => c.funding_id == parseInt(req.params.id));
        res.send(orders)
        
    })
})

app.get('/basket/:id', function(req, res){
    db.query("select * from basket", function(err, rows, fields){
        const basket = rows;
        const baskets = basket.find(c => c.funding_id == parseInt(req.params.id));
        res.send(baskets)
    })
})





app.listen(port, ()=> {
    console.log(`Connection at http://localhost:${port}`);
})