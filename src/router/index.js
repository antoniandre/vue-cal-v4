import { createRouter, createWebHistory } from 'vue-router'
import Documentation from '@/documentation/index.vue'

const routes = [
  {
    path: '/',
    component: Documentation
  },
  {
    path: '/test',
    component: () => import('@/documentation/isolated-test-view.vue')
  },
  {
    path: '/test-html',
    component: () => import('@/documentation/isolated-test-view-html.vue')
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
