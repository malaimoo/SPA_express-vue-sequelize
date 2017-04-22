var express = require('express');
var router = express.Router();
var user = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //如果没有id或者id为空,直接返回
    if (req.query.username == undefined ||req.query.username== ''
        || req.query.password == undefined || req.query.password == '') {
        res.json({status:-1, statusMsg:'参数错误'});
        return;
    }
    user.findOne({
        where:{
            username:req.query.username
        }
    }).then(function(user){
        if (user.password == req.query.password){
            res.json({status:1});
        }else {
            res.json({status:-1,statusMsg:'密码错误'});
        }
    }).catch(function (error) {
        res.json(error)
    });
});


router.get('/create',function (req,res,next) {
    //如果没有post数据或者数据为空,直接返回
    if (req.query.username == undefined ||req.query.username== ''
        || req.query.password == undefined || req.query.password == '') {
        res.json({status:-1, statusMsg:'参数错误'});
        return;
    }
    var message = {
        username: req.query.username,
        password: req.query.password
    };
    //创建一条记录,创建成功后跳转回首页
    user.create(message).then(function(msg){
        res.json({status:1});
    });
});


module.exports = router;
