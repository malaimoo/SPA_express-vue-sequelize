/**
 * Created by wiki on 2017/4/22.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'sys',    //数据库名
    'root',             //用户名
    'xiaocai',             //密码
    {
        'dialect': 'mysql',
        'host': 'localhost',
        'port': 3306
    }
);

//定义表的模型
var Message = sequelize.define('user', {
    id:{ //自增长id,主键,整形
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: { //谁留的言
        type: Sequelize.STRING(300)
    },
    password: { //留言的内容
        type: Sequelize.STRING(300)
    }
});
Message.sync(); //创建表

module.exports = Message;