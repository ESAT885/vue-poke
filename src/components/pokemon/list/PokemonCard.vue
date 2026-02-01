<script setup lang="ts">
import { useFavoriteStore } from '@/stores/pokemonFavoriteStore'
import PokemonTypes from '../PokemonTypes.vue'
import PokemonFavoriteButton from './PokemonFavoriteButton.vue'

const props = defineProps<{ pokemon: any }>()
const favStore = useFavoriteStore()
</script>

<template>
  <li class="relative bg-base-100 rounded-2xl shadow hover:shadow-xl p-4 group">
    
    <PokemonFavoriteButton
      :isFavorite="pokemon.isFavorite"
      @toggle="favStore.toggleFavorite(pokemon.id);pokemon.isFavorite = !pokemon.isFavorite"
    />

    <router-link :to="`/detail/${pokemon.id}`">
      <img :src="pokemon.image" class="mx-auto w-32 h-32" />

      <h3 class="text-center font-bold capitalize mt-2">
        {{ pokemon.name }}
      </h3>

      <PokemonTypes :types="pokemon.types" />

      <p class="text-center text-xs text-gray-400 mt-2">
        #{{ pokemon.id.toString().padStart(3,'0') }}
      </p>
    </router-link>

  </li>
</template>
