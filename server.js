const express = require("express")
const app = express()

// require
const userRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const customerRouter = require('./routes/customer');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')

app.use(express.static(`${__dirname}`));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use('/users',userRouter); // 경로에 해당하는 거 사용
app.use('/login',loginRouter);
app.use('/customer',customerRouter);
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.render('index.ejs',{text: "world" });
});

app.listen(3000)