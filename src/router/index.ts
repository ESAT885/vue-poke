import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import PokemonDetailPage from '@/pages/PokemonDetailPage.vue'
import PokemonListPage from '@/pages/PokemonListPage.vue'
const isProd = import.meta.env.PROD
const router = createRouter({
  history:isProd?createWebHashHistory() : createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path:"/",
      name:"home",
      component:PokemonListPage
    },
    {
      path:"/detail/:id",
      name:"detail",
      component:PokemonDetailPage
    }
  ],
})

export default router
