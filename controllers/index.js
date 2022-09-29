/* mybatisMapper : mybatis $ npm i mybatis-mapper */
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./models/mybatis/testMapper.xml'])// 주의할 점은 경로가 현재위치의 상대경로가 아니라 최상위 app.js 가 있는 경로를 기준으로 해야 에러가 안난다.

/* mysql */
let mysql = require('../config/db');

let format = { language: 'sql' , indent: ' '};
module.exports = {
    getAllUser: function ( req , res , next ) {

        let param = {
            id : req.params.id
        }

        let query = mybatisMapper.getStatement('sqlMapper','getAllQuery',param,format);

        mysql.query(query, (error,rows) => {
            console.log(rows);
            // res.send(rows);
            console.log('getAllUser');
            res.json(rows);
        });
    }
    ,
    getIdUser: function ( req , res , next ) {
        let param = {
            id : req.params.id
        }
        let query = mybatisMapper.getStatement('sqlMapper','getIdQuery',param,format);

        mysql.query(query, (error,rows) => {
            console.log(rows);
            // res.send(rows);
            console.log('getIdUser');
            res.json(rows);
        });
    }
}