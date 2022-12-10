const express = require("express");
const mysql = require('mysql');
//const db = require("./db/index.js");
const app = express()
const nunjucks = require('nunjucks');
// const db = require("./db/index.js");
const app = express()
const port = 3001;
// require
const userRouter = require('./routes/users');

const { response } = require("express");

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}`));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use('/users',userRouter); // 경로에 해당하는 거 사용
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'gomirang',
})

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
    db.query("select * from Funding_product", function(err, rows, fields){
        const product = rows;
        const products = product.find(c => c.Funding_ID == parseInt(req.params.id));
        res.send(products)
    })
})


app.listen(port, ()=> {
    console.log(`Connection at http://localhost:${port}`);
})