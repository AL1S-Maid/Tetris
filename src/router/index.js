import { createRouter, createWebHistory } from 'vue-router'
import GameFrame from '@/views/GameFrame.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'game',
      component: GameFrame,
    }
  ],
})

export default router
