module.exports = app => {
    const router = require("express").Router();
    const mongoose = require('mongoose')
    const Acticle = mongoose.model('Acticle')
    const Category = mongoose.model('Category')

    // 录入数据
    router.get('/news/init', async (req, res) => {
        const parents = await Category.findOne({
            name: '新闻分类'
        })
        const cats = await Category.find().where({
            parents: parents
        }).lean();
        const newsTitles = ["王者荣耀玩家的最佳聚集地，QQ音乐推出特色专区", "模拟战爆料丨换阵营，新天赋，还能“回转”拿BUFF？", "《王者荣耀》×QQ音乐︱快来王者荣耀音乐专区听歌啦！", "活动玩法爆料丨黄忠开大还能走，孙策能开三艘船？！", "体验服爆料丨无限乱斗升级，第七件神装竟是“无限”宝石！", "12月21日体验服停机更新公告", "12月19日体验服停机更新公告", "12月17日全服不停机更新公告", "【体验服】貂蝉局内回城特效和局外背景异常说明", "12月20日体验服不停机更新公告", "恭喜AG超玩会获得秋季赛总冠军！冠军庆典惊喜不断", "KPL限定皮肤【天狼征服者】全服购买开启公告", "【看KPL秋决，赢豪华大礼】活动公告", "【奇遇咕嗒的寻宝之旅】活动公告", "【已修复】圣诞礼盒活动异常修复公告", "冬季冠军杯选拔赛今日15：00热血开战，王者无界，聚有荣耀！", "当古老节气遇上电竞热潮是一种什么样的体验？", "最后一周高校区域联赛决赛本周末开启，你的学校晋级了吗？", "第六届高校联赛海选赛圆满结束，带你回顾往期高光时刻", "请看职业选手的实力！2019终极国服大挑战"]
        const newList = newsTitles.map(title => {
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                title: title,
                categories: randomCats.slice(0, 2)
            }
        })
        // 清空
        await Acticle.deleteMany({})
        await Acticle.insertMany(newList)
        res.send(newList)
    })

    router.get('/news/list', async (req, res) => {
        // const parent = await Category.findOne({
        //     name: "新闻分类"
        // }).populate({
        //     path: 'children',
        //     populate: {
        //         path: 'newsList'
        //     }
        // }).lean()
        const parent = await Category.findOne({
            name: "新闻分类"
        })
        const cats = await Category.aggregate([{
                $match: {
                    parent: parent._id
                }
            },
            {
                $lookup: {
                    from: 'articles',
                    localField: '_id',
                    foreignField: 'categoryies',
                    as: 'newsList'
                }
            }, {
                $addFields: {
                    newsList: {
                        $slice: ['$newsList', 5]
                    }
                }
            }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: "热门",
            newsList: await Acticle.find().where({
                categories: {
                    $in: subCats
                }
            }).populate('categories').limit(5).lean()
        })
        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
                return news;
            })
        })
        res.send(cats)
    })
    app.use('/web/api', router)
}