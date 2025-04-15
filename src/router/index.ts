import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/main.vue'
import LandingPage from '@/views/landing.vue'
import Login from '@/views/login.vue'
import Signup from '@/views/signup.vue'
import NotFound from '@/views/notFound.vue'
import { user } from '@/code/user'

let checkUser = async (t, f, n) => {
  let u = user?.user_id;
  if (u) {
    return n();
  }
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
        path: '/verification',
        name: 'verification',
        component: () => import('@/views/verification.vue')
      },
      {
        path: '/forgot',
        name: 'forgot',
        component: () => import('@/views/forgot-password.vue')
      },
      {
        path: '/change-password',
        name: 'change-password',
        component: () => import('@/views/change-password.vue'),
        beforeEnter: checkUser
      },
      {
        path: '/delete-account',
        name: 'delete-account',
        component: () => import('@/views/delete-account.vue'),
        beforeEnter: checkUser
      },
      {
        path: '/signup_confirmed_template',
        name: 'signup_confirmed',
        component: () => import('@/views/signup_confirmed_template.vue'),
      },
      {
        path: '/invitation_confirmed_template',
        name: 'invitation_confirmed',
        component: () => import('@/views/invitation_confirmed_template.vue'),
      },
      {
        path: '/enable-account/:email',
        name: 'enable-account',
        component: () => import('@/views/enable-account.vue'),
      },
      {
        path: '/success',
        name: 'success',
        component: () => import('@/views/success.vue')
      },
      {
        path: '/bye',
        name: 'bye',
        component: () => import('@/views/bye.vue')
      },
      {
        // path: '/create/:name',
        path: '/create',
        name: 'create',
        component: () => import('@/views/create-service.vue'),
        beforeEnter: checkUser
      },
      {
        path: '/delete-service/:id',
        name: 'delete-service',
        component: () => import('@/views/delete-service.vue'),
        beforeEnter: checkUser
      },
      {
        path: '/subscription/:service',
        name: 'subscription',
        component: () => import('@/views/subscription/subscription.vue'),
        beforeEnter: checkUser
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
          {
            path: 'account-setting',
            name: 'accountsetting',
            component: () => import('@/views/account-setting.vue'),
            beforeEnter: checkUser
          },
          {
            path: 'my-services',
            name: 'myservices',
            component: () => import('@/views/service-list.vue'),
            beforeEnter: checkUser
          },
          {
            path: 'my-services/:service',
            component: () => import('@/views/service/main.vue'),
            beforeEnter: checkUser,
            children: [
              {
                path: '',
                name: 'service',
                component: () => import('@/views/service/getting_started.vue'),
              },
              {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/service/service.vue'),
              },
              {
                path: 'users',
                name: 'users',
                component: () => import('@/views/service/users/users.vue'),
              },
              {
                path: 'records',
                name: 'records',
                component: () => import('@/views/service/records/records.vue'),
              },
              {
                path: 'openid',
                name: 'openid',
                component: () => import('@/views/service/openid/openid.vue'),
              },
              {
                path: 'mail',
                name: 'mail',
                component: () => import('@/views/service/mail.vue'),
              },
              {
                path: 'newsletter',
                name: 'newsletter',
                component: () => import('@/views/service/newsletter.vue'),
              },
              {
                path: 'hosting',
                name: 'hosting',
                component: () => import('@/views/service/hosting/hosting.vue'),
              },
              {
                path: 'clientsecret',
                name: 'clientsecret',
                component: () => import('@/views/service/client_secret.vue'),
              },
              {
                path: 'etc/testing',
                name: 'etc-testing',
                component: () => import('@/views/service/testing.vue')
              },
              {
                path: 'test/openid',
                name: 'test/openid',
                component: () => import('@/views/service/tester/openid.vue')
              }
            ]
          },
        ]
      },

      // test pages
      {
        path: '/test/ui',
        name: 'ui',
        component: () => import('@/views/ui.vue')
      },

      // 404 page
      {
        path: "/404page",
        name: "404page",
        component: NotFound
      },
      {
        path: "/:pathMatch(.*)*",
        redirect: "/404page"
      },

    ]
  })

export default router
