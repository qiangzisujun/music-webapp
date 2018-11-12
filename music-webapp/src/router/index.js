import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/reset.scss"
import Player from '../components/player'
import Home from '../components/home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/player',
      name: 'player',
      component: Player
    }
  ]
})
