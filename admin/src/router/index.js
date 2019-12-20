import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: "login",
    meta: {
      isPublic: true
    },
    component: Login
  },
  {
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
      },

      // 广告位
      {
        path: 'ads/create',
        component: () => import('../views/AdsEdit.vue')
      },
      {
        path: 'ads/edit/:id',
        component: () => import('../views/AdsEdit.vue'),
        props: true
      },
      {
        path: 'ads/list',
        component: () => import('../views/AdsList.vue')
      },

      //管理员
      {
        path: 'admin_users/create',
        component: () => import('../views/AdminUserEdit.vue')
      },
      {
        path: 'admin_users/edit/:id',
        component: () => import('../views/AdminUserEdit.vue'),
        props: true
      },
      {
        path: 'admin_users/list',
        component: () => import('../views/AdminUserList.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next();
})

export default router