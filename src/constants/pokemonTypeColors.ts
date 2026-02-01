// pokemonTypes.ts
export interface PokemonTypeConfig {
  label: string
  class: string
}

export const pokemonTypes: Record<string, PokemonTypeConfig> = {
  normal:   { label: 'Normal',    class: 'bg-gray-200 text-gray-700' },
  fire:     { label: 'Ateş',      class: 'bg-orange-200 text-orange-700' },
  water:    { label: 'Su',        class: 'bg-blue-200 text-blue-700' },
  electric: { label: 'Elektrik',  class: 'bg-yellow-200 text-yellow-700' },
  grass:    { label: 'Çim',       class: 'bg-green-200 text-green-700' },
  ice:      { label: 'Buz',       class: 'bg-cyan-200 text-cyan-700' },
  fighting: { label: 'Dövüş',     class: 'bg-red-200 text-red-700' },
  poison:   { label: 'Zehir',     class: 'bg-purple-200 text-purple-700' },
  ground:   { label: 'Toprak',    class: 'bg-amber-200 text-amber-700' },
  flying:   { label: 'Uçan',      class: 'bg-sky-200 text-sky-700' },
  psychic:  { label: 'Psişik',    class: 'bg-pink-200 text-pink-700' },
  bug:      { label: 'Böcek',     class: 'bg-lime-200 text-lime-700' },
  rock:     { label: 'Kaya',      class: 'bg-stone-200 text-stone-700' },
  ghost:    { label: 'Hayalet',   class: 'bg-violet-200 text-violet-700' },
  dragon:   { label: 'Ejderha',   class: 'bg-indigo-200 text-indigo-700' },
  dark:     { label: 'Karanlık',  class: 'bg-zinc-800 text-zinc-100' },
  steel:    { label: 'Çelik',     class: 'bg-slate-200 text-slate-700' },
  fairy:    { label: 'Peri',      class: 'bg-rose-200 text-rose-700' },
}
