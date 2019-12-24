import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [{
      path: '/',
      name: "home",
      component: Home
    },
    {
      path: '/articles/:id',
      name: "articles",
      component: () => import('../views/Article.vue'),
      props: true
    }]
  },
  {
    path: "/heroes/:id",
    name: "heroes",
    component: () => import("../views/Hero.vue"),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router