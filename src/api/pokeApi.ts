import axios from 'axios'


export const pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 5000,
})



export async function fetchPokemonsWithImages(limit = 20, offset = 0) {
    const { data } = await pokeApi.get(`/pokemon?limit=${limit}&offset=${offset}`)
    const detailed = await Promise.all(
        data.results.map(async (p: { name: string; url: string }) => {
            const res = await axios.get(p.url)
            const pokemon = res.data
            console.log(pokemon);
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.other['official-artwork'].front_default,
                types: pokemon.types.map((t: any) => t.type.name),
            }
        })
    )
    return detailed
}


