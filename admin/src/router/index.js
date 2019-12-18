import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'main',
  component: Main,
  children: [{
      // 分类信息
      path: '/categories/create',
      component: () => import('../views/CategoryEdit.vue')
    },
    {
      path: '/categories/edit/:id',
      component: () => import('../views/CategoryEdit.vue'),
      props: true
    },
    {
      path: '/categories/list',
      component: () => import('../views/CategoryList.vue')
    },


    // 物品
    {
      path: 'items/create',
      component: () => import('../views/itemEdit.vue')
    },
    {
      path: 'items/edit/:id',
      component: () => import('../views/itemEdit.vue'),
      props: true
    },
    {
      path: 'items/list',
      component: () => import('../views/itemList.vue')
    },


    // 英雄
    {
      path: 'heroes/create',
      component: () => import('../views/HeroEdit.vue')
    },
    {
      path: 'heroes/edit/:id',
      component: () => import('../views/HeroEdit.vue'),
      props: true
    },
    {
      path: 'heroes/list',
      component: () => import('../views/HeroList.vue')
    },

     // 文章
     {
      path: 'acticles/create',
      component: () => import('../views/ActicleEdit.vue')
    },
    {
      path: 'acticles/edit/:id',
      component: () => import('../views/ActicleEdit.vue'),
      props: true
    },
    {
      path: 'acticles/list',
      component: () => import('../views/ActicleList.vue')
    }
  ]
}]

const router = new VueRouter({
  routes
})

export default router