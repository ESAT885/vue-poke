<script setup lang="ts">
import PokemonTypes from '@/components/pokemon/PokemonTypes.vue'

defineProps<{
  pokemon: any
}>()
</script>

<template>
  <div class="text-center space-y-2">
    <h1 class="text-4xl font-bold capitalize">{{ pokemon?.name }}</h1>
    <p class="opacity-60">#{{ pokemon?.id }}</p>
    <PokemonTypes :types="pokemon?.types.map(t => t.type.name) ?? []" />
  </div>
</template>
