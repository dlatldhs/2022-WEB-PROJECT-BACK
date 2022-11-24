const express = require('express');
const router = express.Router();
// app == router (e.g) app.get app.post app.delete => router.get router.post router.delete
// 기본적으로 경로가 users에서 시작함 원래 /users 였으면 / 해도 같은 의미
// express는 위에서부터 아래로 실행함
router.use(logger);
router.get('/',(req,res) => {
    console.log(req.query.name);
    res.send('This is Users');
});

router.get('/new',(req,res) => {
    res.render('users/new');
});

router.post('/',(req, res) => {
    const isValid = true;
    if ( isValid ) {
        users.push( { firstName: req.body.firstName } ); // db
        console.log(users);
        res.redirect(`/users/${users.length -1 }`);
    }
    else {
        console.log('error');
        res.render('users/new',{ firstName: req.body.firstName });
    }
});

router.route('/:userId').get((req, res) => { // request response
    console.log(req.user);
    res.send(`Get User With ID ${req.params.userId}`)
}).put((req, res) => {
    res.send(`Update User With ID ${req.params.userId}`)
}).delete((req, res) => {
    res.send(`Delete User With ID ${req.params.userId}`)
})

const users = [{name: "임시온"},{name: "IM SION"}]
router.param("userId",(req, res, next, id) => { // router.param이 해당 매개변수를 찾으면 내부 코드를 실행해서 무한 로딩이 걸림
    req.user = users[id];
    next();
    // midleware 요청의 시작과 끝 사이에 실행되는 코드
})

/** logger show Url*/
function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}
module.exports = router;