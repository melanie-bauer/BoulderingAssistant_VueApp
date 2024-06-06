import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/boulderingSession',
      name: 'boulderingSession',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/BoulderingSession.vue')
    },
    {
      path: '/connectRaspi',
      name: 'getRaspiConnection',
      component: () => import('@/views/GetNextHandle.vue')
    }
    ,
    {
      path: '/overview',
      name: 'Overview',
      component: () => import('@/views/Overview.vue')
    }
  ]
})

export default router
