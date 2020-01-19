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
    component: () => import(/* webpackChunkName: "Index" */ '@/views/Index')
  },
  {
    path: '/login',
    meta: { public: true },
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login')
  },
  {
    path: '/logout',
    meta: { public: true },
    name: 'logout',
    component: () => import(/* webpackChunkName: "Logout" */ '@/views/Logout')
  },
  {
    path: '/student',
    component: () => import(/* webpackChunkName: "student" */ '@/views/student'),
    children: [
      {
        path: '',
        redirect: { name: 'student' }
      },
      {
        path: 'index',
        name: 'student',
        component: () => import(/* webpackChunkName: "main" */ '@/views/student/main')
      }
    ]
  },
  {
    path: '/teacher',
    component: () => import(/* webpackChunkName: "teacher" */ '@/views/teacher'),
    children: [
      {
        path: '',
        redirect: { name: 'teacher' }
      },
      {
        path: 'index',
        name: 'teacher',
        component: () => import(/* webpackChunkName: "main" */ '@/views/teacher/main')
      },
      {
        path: 'question',
        name: 'teacher-question',
        component: () => import(/* webpackChunkName: "question" */ '@/views/teacher/question')
      },
      {
        path: 'course',
        component: () => import(/* webpackChunkName: "course" */ '@/views/teacher/course'),
        children: [
          {
            path: '',
            name: 'teacher-course',
            redirect: { name: 'teacher-course-index' }
          },
          {
            path: 'index',
            name: 'teacher-course-index',
            component: () => import(/* webpackChunkName: "course" */ '@/components/course')
          },
          {
            path: 'management',
            name: 'teacher-course-management',
            component: () => import(/* webpackChunkName: "management" */ '@/components/course/management')
          }
        ]
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
