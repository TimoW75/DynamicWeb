import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('$/views/Home.vue')
  },
  {
    path: '/',
    name: 'library',
    component: () => import('$/views/Contact.vue')
  },
  {
    path: '/Contact',
    name: 'Contact',
    component: () => import('$/views/Contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory('DynamicWeb'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
