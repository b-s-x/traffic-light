import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Red from "../components/TrafficRed.vue"
import Yellow from "../components/TrafficYellow.vue"
import Green from "../components/TrafficGreen.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: "/red",
      children: [
        {
          path: '/red',
          name: 'Red',
          component: Red
        },
        {
          path: '/yellow',
          name: 'Yellow',
          component: Yellow
        },
        {
          path: '/green',
          name: 'Green',
          component: Green
        },
      ]
    },
  ]
})

export default router
