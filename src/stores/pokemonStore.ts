import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import {  fetchPokemonsWithImages } from '@/api/pokeApi'
const FAVORITE_KEY = 'pokemon-favorites'
export interface PokemonListItem {
  id: number,
  name: string,
  image: string,
  types: string,
  isFavorite: boolean,
}

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemons = ref<PokemonListItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /* FAVORITES (local) */
  const favorites = ref<number[]>(
    JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]')
  )

  // infinite scroll state
  const offset = ref(0)
  const limit = 20
  const hasMore = ref(true)

  // search state
  const query = ref('')

  async function loadPokemons() {
    offset.value = 0
    hasMore.value = true
    pokemons.value = []
    await loadMorePokemons()
  }

  async function loadMorePokemons() {
    if (!hasMore.value || loading.value) return

    try {
      loading.value = true
      const data = await fetchPokemonsWithImages(limit, offset.value)

      if (!data || data.length === 0) {
        hasMore.value = false
        return
      }
      const updatedData = data.map(p => ({
      ...p,
      isFavorite: favorites.value.includes(p.id),
    }))
      pokemons.value.push(...updatedData)
      offset.value += limit
    } catch (e: any) {
      error.value = e.message || 'Failed to load pokemons'
    } finally {
      loading.value = false
    }
  }

  const filteredPokemons = computed(() => {
    if (!query.value) return pokemons.value
    return pokemons.value.filter(p =>
      p.name.toLowerCase().includes(query.value.toLowerCase())
    )
  })
  /* localStorage sync */
  watch(
    favorites,
    (val) => {
      localStorage.setItem(FAVORITE_KEY, JSON.stringify(val))
    },
    { deep: true }
  )
  return {
    pokemons,
    loading,
    error,
    offset,
    hasMore,
    query,
    filteredPokemons,
    loadPokemons,
    loadMorePokemons,
  }
})