<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'
import PokemonList from '@/components/pokemon/list/PokemonList.vue'

const store = usePokemonStore()
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  store.loadPokemons()

  observer = new IntersectionObserver(entries => {
    if (entries[0]?.isIntersecting) {
      store.loadMorePokemons()
    }
  }, {
    rootMargin: '200px'
  })

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="bg-base-200 min-h-screen p-6">
    <input
      v-model="store.query"
      placeholder="Pokemon ara..."
      class="input input-bordered w-full mb-4"
    />

    <p v-if="store.error" class="text-red-500">{{ store.error }}</p>

    <PokemonList :pokemons="store.filteredPokemons" />

    <p v-if="store.loading" class="mt-4">Yükleniyor...</p>

    <div ref="sentinel" class="h-32"></div>
  </div>
</template>
