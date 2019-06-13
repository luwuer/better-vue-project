import Vue from 'vue'
import Router from 'vue-router'
import Home from '@pd/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () =>
        import(/* webpackChunkName: "pd/views/about" */ '@pd/views/About.vue')
    }
  ]
})
