import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/pa/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      // route level code-splitting
      // this generates a separate chunk (views/about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "views/about" */ '@/pages/pa/views/About.vue')
    }
  ]
})
