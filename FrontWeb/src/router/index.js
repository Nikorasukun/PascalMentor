import { createRouter, createWebHistory } from 'vue-router'
import SignInOrRegister from '@/views/SignInOrRegister.vue'
import Home from '@/views/Home.vue'
import PersonalArea from '@/views/PersonalArea.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInOrRegister,
    },
    {
      path: '/personal-area',
      name: 'personal-area',
      component: PersonalArea,
    }
  ],
})

export default router
