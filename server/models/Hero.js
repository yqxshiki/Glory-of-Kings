const mongoose = require('mongoose')
// 模型
const schema = new mongoose.Schema({
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    banner: {
        type: String
    },
    title: {
        type: String
    },
    // 类别
    categories: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category'
    }],
    scores: {
        // 难度
        diffcult: {
            type: Number
        },
        // 技巧
        skills: {
            type: Number
        },
        // 攻击
        attack: {
            type: Number
        },
        // 生存
        aurvice: {
            type: Number
        }
    },
    // 技能
    skills: [{
        icon: {
            type: String
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        tips: {
            type: String
        }
    }],
    // 出装
    items1: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    items2: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Item'
    }],
    // 使用技巧
    usageTips: {
        type: String
    },
    // 对战技巧
    battleTips: {
        type: String
    },
    // 团战思路
    teamTips: {
        type: String
    },
    // 搭档
    partners: {
        hero: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Hero"
        },
        description: {
            type: String
        }
    }

})

module.exports = mongoose.model('Hero', schema, 'heroes')