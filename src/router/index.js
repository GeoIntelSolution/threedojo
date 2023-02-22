import Vue from 'vue'
import VueRouter from 'vue-router'
import SDFDemo from '../components/SDFDemo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: SDFDemo
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },{
    path:'/SDF',
    name:'SDF',
    component:SDFDemo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
