<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePokemonDetailStore } from '@/stores/pokemonDetailStore'
import { useFavoriteStore } from '@/stores/pokemonFavoriteStore'

import PokemonHeader from '@/components/pokemon/detail/PokemonHeader.vue'
import PokemonImageGallery from '@/components/pokemon/detail/PokemonImageGallery.vue'
import PokemonInfoGrid from '@/components/pokemon/detail/PokemonInfoGrid.vue'
import PokemonAbilities from '@/components/pokemon/detail/PokemonAbilities.vue'
import PokemonMoves from '@/components/pokemon/detail/PokemonMoves.vue'
import PokemonStats from '@/components/pokemon/detail/PokemonStats.vue'
import PokemonEvolution from '@/components/pokemon/detail/PokemonEvolution.vue'
import PokemonActions from '@/components/pokemon/detail/PokemonActions.vue'

const store = usePokemonDetailStore()
const favStore = useFavoriteStore()
const route = useRoute()

onMounted(() => {
  store.fetchPokemon(Number(route.params.id))
})
</script>

<template>
  <div class="min-h-screen p-6 flex justify-center bg-base-200">

    <div v-if="store.loading" class="p-20">⏳ Yükleniyor...</div>
    <div v-else-if="store.error" class="p-20 text-error">{{ store.error }}</div>

    <div v-else class="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6 space-y-6">

      <PokemonHeader :pokemon="store.pokemon" />
      <PokemonImageGallery :sprites="store.pokemon?.sprites" />

      <PokemonInfoGrid
        :height="store.pokemon?.height"
        :weight="store.pokemon?.weight"
        :baseExp="store.pokemon?.base_experience"
        :captureRate="store.captureRate?? 0"
      />

      <PokemonAbilities :abilities="store.pokemon?.abilities" />
      <PokemonMoves :moves="store.pokemon?.moves" />
      <PokemonStats :stats="store.pokemon?.stats" />
      <PokemonEvolution :chain="store.evolutionChain" />

      <PokemonActions
        :pokemonId="store.pokemon?.id"
        :isFavorite="favStore.isFavorite(store.pokemon?.id ?? 0)"
        @toggleFavorite="favStore.toggleFavorite"
      />
    </div>
  </div>
</template>
