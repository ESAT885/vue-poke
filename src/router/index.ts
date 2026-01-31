import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import  HomePage  from '@/pages/HomePage.vue'
import PokemonDetail from '@/components/PokemonDetail.vue'
const isProd = import.meta.env.PROD
const router = createRouter({
  history:isProd?createWebHashHistory() : createWebHistory(),
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
