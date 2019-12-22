// 连接数据库
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    
    // 关联所有模型
    require('require-all')(__dirname+'/../models')
    
}