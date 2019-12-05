const mongoose = require('mongoose')
// 模型
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    parents: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
    },
})

module.exports = mongoose.model('Category', schema)