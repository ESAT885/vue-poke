import { pokeApi } from './pokeApi'
import type { Pokemon, EvolutionItem } from '@/stores/pokemonDetailStore'

export async function fetchPokemonApi(id: number): Promise<Pokemon> {
  const { data } = await pokeApi.get(`/pokemon/${id}`)
  return data
}

export async function fetchPokemonSpeciesApi(id: number) {
  const { data } = await pokeApi.get(`/pokemon-species/${id}`)
  return data
}

export async function fetchEvolutionChainApi(
  url: string
): Promise<EvolutionItem[]> {
  const { data } = await pokeApi.get(url)

  const chain: EvolutionItem[] = []

  function walk(node: any) {
    const parts = node.species.url.split('/')
    const id = Number(parts[parts.length - 2])

    chain.push({
      id,
      name: node.species.name,
    })

    if (node.evolves_to?.length) {
      walk(node.evolves_to[0])
    }
  }

  walk(data.chain)
  return chain
}
