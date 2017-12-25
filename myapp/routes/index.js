var express = require('express');
var router = express.Router();
var mysql = require('./mysql');


        router.get('/', function(req, res, next) {
            mysql.query("select * from user",function (err,result) {
                if(err){
                    console.log(err)
                    res.end();
                }else {
            res.render('index', { title: result });
                }
        });
        router.get('/add',function (req,res,next) {
                res.render('add')
            });
        router.get('/adds',function (req,res,next) {
            var uname=req.query.uname;
            var age=req.query.age;
            mysql.query(`insert into user (uname,age) values ('${uname}','${age}')`,function (err,data) {
                if(err){
                    console.log(err);
                    res.end();
                }else {
                    res.render('message',{massge:"插入成功",url:'/'})
                }
            })
        });
        router.get('/del/:uid',function (req,res,next) {
            var uid=req.params.uid;
            console.log(uid)
            mysql.query("delete from user where uid="+uid,function (err,data) {
                if(err){
                    res.end();
                }else {
                    res.render('message',{massge:"删除成功",url:'/'})
                }
            })
        });
        router.get('/updata/:uid',function (req,res,next) {
            var uid=req.params.uid;
            mysql.query("select * from user where uid="+uid,function (err,data) {
                if(err){
                    console.log(err)
                    res.end();
                }else {
                    res.render('updata',{data:data});
                }
            })
        });
        router.get('/updataS/:uid',function(req,res,next){
            var uname=req.query.uname;
            var age=req.query.age;
            var uid=req.params.uid;
            mysql.query(`update user set uname='${uname}',age='${age}' where uid=`+uid,function (err,data) {
                if(err){
                    console.log(err)
                    res.end();
                }else{
                    res.render('message',{massge:"更新成功",url:'/'})
                }
            })
            })

})
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: result });
// });

module.exports = router;
