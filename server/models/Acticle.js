const mongoose = require('mongoose')
// 模型
const schema = new mongoose.Schema({
    title: {
        type: String
    },
    body:{type:String},
    // 类别
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
})

module.exports = mongoose.model('Acticle', schema)