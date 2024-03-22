import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main.vue'
import LandingPage from '@/views/landing.vue'
import Create from '@/views/create.vue'
import Subscription from '@/views/service/subscription/subscription.vue'
import MyServices from '@/views/services.vue'
import ServiceMain from '@/views/service/main.vue'
import Service from '@/views/service/service.vue'
import Users from '@/views/service/users/users.vue'
import Records from '@/views/service/records/records.vue'
import Mail from '@/views/service/mail.vue'
import Hosting from '@/views/service/hosting/hosting.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: LandingPage
    // },
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/subscription/:service',
      name: 'subscription',
      component: Subscription
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
