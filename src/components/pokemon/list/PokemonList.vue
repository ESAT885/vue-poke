<script setup lang="ts">
import PokemonCard from './PokemonCard.vue'
defineProps<{ pokemons: any[] }>()
</script>

<template>
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <PokemonCard
      v-for="p in pokemons"
      :key="p.id"
      :pokemon="p"
    />
  </ul>
</template>
