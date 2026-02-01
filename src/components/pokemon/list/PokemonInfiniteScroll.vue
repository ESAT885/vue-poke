<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'

const store = usePokemonStore()
const sentinel = ref<HTMLElement | null>(null)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(entries => {
    if (entries[0]?.isIntersecting) {
      store.loadMorePokemons()
    }
  }, { rootMargin: '200px' })

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <div ref="sentinel" class="h-32"></div>
</template>
