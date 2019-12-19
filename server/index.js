const express = require('express')

const app = express();
// token散列部分
app.set('secret','4asg586ag4a6g4')
// 解析json
app.use(express.json())
// 跨域
app.use(require('cors')())
// 静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/admin/index')(app)
// 连接数据库
require('./plugins/db')(app)


app.listen(3000, () => {
    console.log("http://localhost:3000")
})