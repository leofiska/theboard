import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/Session'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/session/*',
      name: 'session',
      component: Session
    }
  ]
})
