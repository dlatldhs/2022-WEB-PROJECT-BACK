const express = require('express');
const router = express.Router();

router.use(logger);

router.get('/',(req,res) => {
    res.render('customers/customer')
});

router.post('/',(req,res) => {
    console.log(req.body.email);
    return res.json({
        email: req.body.email,
        password: req.body.pwd,
        name: req.body.c_name,
        address: req.body.address
    })
})
function logger (req,res,next) {
    console.log(req.originalUrl);
    next();
}

module.exports = router;