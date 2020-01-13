import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Index')
  },
  {
    path: '/student',
    component: () => import(/* webpackChunkName: "about" */ '@/views/student'),
    children: [
      {
        path: '',
        name: 'student',
        component: () => import(/* webpackChunkName: "about" */ '@/views/student/main')
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import(/* webpackChunkName: "about" */ '@/views/teacher'),
    children: [
      {
        path: '',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "about" */ '@/views/teacher/main')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
