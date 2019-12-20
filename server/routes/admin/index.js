module.exports = app => {
    const express = require("express")
    const jwt = require('jsonwebtoken')
    const AdminUser = require("../../models/AdminUser")
    const assert = require("http-assert")
    const router = express.Router({
        mergeParams: true
    })
    // 创建
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    // 修改
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除
    router.delete('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === "Category") {
            queryOptions.populate = 'parents';
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    //资源详情
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 登录效验中间件
    const authMiddleware = require("../../middleware/auth")
    // 转换model名接口中间件
    const resourceMiddleware = require("../../middleware/resource")
    // curd 通用接口
    app.use('/admin/api/rest/:resource', resourceMiddleware(), router)

    // 上传图片
    const multer = require("multer")
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post("/admin/api/upload", upload.single('file'), async (req, res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file);
    })


    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        // 根据用户名找用户
        const user = await AdminUser.findOne({
            username
        }).select('+password')

        assert(user, 422, '用户名不存在')
        // 效验密码
        const isValid = require("bcryptjs").compareSync(password, user.password)
        assert(isValid, 422, '密码错误')

        // 返回token
        const token = jwt.sign({
            id: user._id
        }, app.get('secret'))
        res.send(token);
    })


    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}