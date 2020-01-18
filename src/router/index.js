import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import * as oauthAPI from '@/api/oauth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    meta: { public: true },
    component: () => import(/* webpackChunkName: "about" */ '@/views/Index')
  },
  {
    path: '/login',
    meta: { public: true },
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login')
  },
  {
    path: '/logout',
    meta: { public: true },
    name: 'logout',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Logout')
  },
  {
    path: '/student',
    component: () => import(/* webpackChunkName: "about" */ '@/views/student'),
    children: [
      {
        path: '',
        redirect: { name: 'student' }
      },
      {
        path: 'index',
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
        redirect: { name: 'teacher' }
      },
      {
        path: 'index',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "about" */ '@/views/teacher/main')
      },
      {
        path: 'question',
        name: 'teacher-question',
        component: () => import(/* webpackChunkName: "about" */ '@/views/teacher/question')
      },
      {
        path: 'course',
        name: 'teacher-course',
        component: () => import(/* webpackChunkName: "about" */ '@/views/teacher/course')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    next()
  } else if (!store.getters['auth/isAuth']) {
    oauthAPI.authServer()
  } else {
    next()
  }
})

export default router
