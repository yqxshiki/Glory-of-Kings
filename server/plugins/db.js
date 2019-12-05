// 连接数据库
module.exports = app => {
    const mongoose = require("mongoose")
    mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}