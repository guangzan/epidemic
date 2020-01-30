import Vue from 'vue'
import VueRouter from 'vue-router'
import Trend from '@/components/Trend.vue'
import Message from '@/components/Message.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/trend'
  },
  {
    path: '/trend',
    name: 'trend',
    component: Trend
  },
  {
    path: '/Message',
    name: 'message',
    component: Message
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
