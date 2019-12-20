module.exports = options => {
    return async (req, res, next) => {
        // 转换文件名
        const modelname = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelname}`)
        await next();
    }
}