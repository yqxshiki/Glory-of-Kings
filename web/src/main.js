import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import './assets/style.scss'

// iconfont
import './assets/iconfont/iconfont.css'

import Card from './components/Card.vue'
Vue.component("mycard", Card)

import ListCard from './components/ListCard.vue'
Vue.component("mylistcard", ListCard)

// 轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_URL || '/web/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
