import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: () => import( '../views/Reservations.vue')
  },
  {
    path: '/resto',
    name: 'Resto',
    component: () => import('../views/Resto.vue')
  },
  {
    path: '/resto/:id',
    name: 'RestoDetail',
    component: () => import('../views/RestoDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
