import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const STORAGE_KEY = 'pokemon-favorites'

export const useFavoriteStore = defineStore('favorites', () => {
  // localStorage’dan oku
  const favorites = ref<number[]>(
    JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  )

  function toggleFavorite(id: number) {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter(f => f !== id)
    } else {
      favorites.value.push(id)
    }
  }

  function isFavorite(id: number) {
    return favorites.value.includes(id)
  }

  // localStorage sync
  watch(
    favorites,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
})
