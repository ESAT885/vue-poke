import { createRouter, createWebHistory } from 'vue-router'
import  HomePage  from '@/pages/HomePage.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path:"/detail/:id",
      name:"detail",
      component:PokemonDetail
    }
  ],
})

export default router
