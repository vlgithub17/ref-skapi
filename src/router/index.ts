import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main.vue'
import LandingPage from '@/views/landing.vue'
import Login from '@/views/login.vue'
import Signup from '@/views/signup.vue'
import Create from '@/views/create.vue'
import Subscription from '@/views/subscription/subscription.vue'
import MyServices from '@/views/services.vue'
import ServiceMain from '@/views/service/main.vue'
import Service from '@/views/service/service.vue'
import Users from '@/views/service/users/users.vue'
import Records from '@/views/service/records/records.vue'
import Mail from '@/views/service/mail.vue'
import Hosting from '@/views/service/hosting/hosting.vue'
import { skapi } from '@/code/admin'

let checkUser = async (t, f, n)=>{
  let u = await skapi.getProfile();
  if(u) return n();
  n('/login');
}

const router = createRouter(
  {
    scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: () => import('@/views/confirmation.vue')
    },
    {
      path: '/forgot',
      name: 'forgot',
      component: () => import('@/views/forgot-password.vue')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/success.vue')
    },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/subscription/:service',
      name: 'subscription',
      component: Subscription,
      // beforeEnter: checkUser
    },
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          name: 'home',
          component: LandingPage
        },
        // {
        //   path: '/subscription/:service',
        //   name: 'subscription',
        //   component: Subscription
        // },
        {
          path: 'my-services',
          name: 'myservices',
          component: MyServices
        },
        {
          path: 'my-services/:service',
          component: ServiceMain,
          children: [
            {
              path: '',
              name: 'service',
              component: Service
            },
            {
              path: 'users',
              name: 'users',
              component: Users
            },
            {
              path: 'records',
              name: 'records',
              component: Records
            },
            {
              path: 'mail',
              name: 'mail',
              component: Mail
            },
            {
              path: 'hosting',
              name: 'hosting',
              component: Hosting
            }
          ]
        },
      ]
    },
  ]
})

export default router
