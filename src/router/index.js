import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
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
      path: '/game/*',
      name: 'game',
      component: Game
    }
  ]
})
