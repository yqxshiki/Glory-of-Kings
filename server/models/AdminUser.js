const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
        // 不可查
        select: false,
        // 加密
        set(val) {
            return require("bcryptjs").hashSync(val, 10)
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)