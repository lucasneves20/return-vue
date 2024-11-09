import { createRouter, createWebHistory } from 'vue-router'
import Post from '../pages/PostPages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Post',
      component: Post,
    }
  ],
})

export default router
