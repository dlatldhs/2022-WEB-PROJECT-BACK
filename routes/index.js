/* basic */
var express = require('express');
var router = express.Router();

let index = require('../controllers/index');

router.get('/',index.getAllUser);

router.get('/:id', index.getIdUser);

module.exports = router;