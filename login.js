const express = require('express');
const router = express.Router();

router.use(logger);
router.get('/',(req,res) => {
    res.render('customers/login')
});

router.post('/',(req,res) => {
    return res.json( {
        isSuccess: "SUCCESS",
        yourId: req.body.id,
        yourPwd: req.body.pwd
    } );
});

function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;