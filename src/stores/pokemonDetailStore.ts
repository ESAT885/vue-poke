import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  fetchPokemonApi,
  fetchPokemonSpeciesApi,
  fetchEvolutionChainApi,
} from '@/api/pokemonDetailApi'
export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: any
  types: { type: { name: string } }[]
  abilities: { ability: { name: string } }[]
  moves: { move: { name: string } }[]
  stats: {
    base_stat: number
    stat: { name: string }
  }[]
}

export interface EvolutionItem {
  id: number
  name: string
}



export const usePokemonDetailStore = defineStore('pokemonDetail', () => {
  const pokemon = ref<Pokemon | null>(null)
  const evolutionChain = ref<EvolutionItem[]>([])
  const captureRate = ref<number | null>(null)

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPokemon(id: number) {
    try {
      loading.value = true
      error.value = null

      pokemon.value = await fetchPokemonApi(id)

      const species = await fetchPokemonSpeciesApi(id)
      captureRate.value = species.capture_rate

      evolutionChain.value = await fetchEvolutionChainApi(
        species.evolution_chain.url
      )
    } catch (e: any) {
      error.value = e.message || 'Bir hata oluştu'
    } finally {
      loading.value = false
    }
  }

  return {
    pokemon,
    evolutionChain,
    captureRate,
    loading,
    error,
    fetchPokemon,
  }
})