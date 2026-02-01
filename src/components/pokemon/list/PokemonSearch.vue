<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore'
const store = usePokemonStore()
</script>

<template>
  <input
    v-model="store.query"
    type="text"
    placeholder="Pokemon Ara..."
    class="border rounded px-3 py-2 mb-4 w-full"
  />
</template>
