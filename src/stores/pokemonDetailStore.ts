import { defineStore } from 'pinia'
import { ref } from 'vue'
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

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      if (!res.ok) throw new Error('Pokemon bulunamadı')
      pokemon.value = await res.json()

      await fetchSpecies(id)
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchSpecies(id: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const data = await res.json()

    captureRate.value = data.capture_rate
    await fetchEvolutionChain(data.evolution_chain.url)
  }

  async function fetchEvolutionChain(url: string) {
    const res = await fetch(url)
    const data = await res.json()

    const chain: EvolutionItem[] = []

    function walk(node: any) {
      const parts = node.species.url.split('/')
      const id = Number(parts[parts.length - 2])

      chain.push({
        id,
        name: node.species.name
      })

      if (node.evolves_to.length) {
        walk(node.evolves_to[0])
      }
    }

    walk(data.chain)
    evolutionChain.value = chain
  }

  return {
    pokemon,
    evolutionChain,
    captureRate,
    loading,
    error,
    fetchPokemon
  }
})
