import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'main',
    component: Main,
    children: [{
      path: '/',
      name: "home",
      component: Home
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router