import NotFound from '@/pages/NotFound.vue'
import PostEditor from '@/pages/PostEditor/PostEditor.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PostPage from '../pages/PostPages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Post',
      component: PostPage,

    },
    {
      path: '/editor-post',
      name: 'Edit Post',
      component: PostEditor,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: NotFound
    }
  ],
})

export default router
