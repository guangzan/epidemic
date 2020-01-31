import Vue from 'vue'
import VueRouter from 'vue-router'
import Trend from '@/components/Trend.vue'
import Message from '@/components/Message.vue'
import News from '@/components/News.vue'

Vue.use(VueRouter)

// 重写 push replace 方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

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
    path: '/news',
    name: 'news',
    component: News
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
