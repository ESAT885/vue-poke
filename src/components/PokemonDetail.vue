<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { usePokemonDetailStore } from '@/stores/pokemonDetailStore.ts'
import { useRoute } from 'vue-router';
import { useFavoriteStore } from '@/stores/pokemonFavoriteStore.ts';
const store = usePokemonDetailStore()
const favStore = useFavoriteStore()

onMounted(() => {
  const route = useRoute()
  const pokeId = route.params.id as string
  store.fetchPokemon(Number(pokeId))
})
const selectedImage = ref<string | null>(null)

// varsayılan ana görsel
const mainImage = computed(() => {
  return (
    selectedImage.value ||
    store.pokemon?.sprites?.other?.['official-artwork']?.front_default ||
    store.pokemon?.sprites?.front_default ||
    ''
  )
})

// thumbnail listesi (null olanlar filtrelenir)
const thumbnails = computed(() => {
  if (!store.pokemon) return []

  return [
      store.pokemon?.sprites?.other?.['official-artwork']?.front_default ,
    store.pokemon.sprites?.front_default,
    store.pokemon.sprites?.back_default,
    store.pokemon.sprites?.front_shiny,
    store.pokemon.sprites?.other?.home?.front_default
  ].filter(Boolean)
})
</script>

<template>
  <div class="min-h-screen p-6 flex justify-center bg-base-200">

    <!-- loading -->
    <div v-if="store.loading" class="text-center p-20 text-lg">
      ⏳ Yükleniyor...
    </div>

    <!-- error -->
    <div v-else-if="store.error" class="text-error p-20">
      {{ store.error }}
    </div>

    <!-- content -->
    <div v-else class="w-full max-w-3xl bg-base-100 rounded-2xl shadow-xl p-6">

      <!-- Header -->
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-4xl font-bold capitalize">
          {{ store.pokemon?.name }}
        </h1>
        <p class="text-sm opacity-70">
          #{{ store.pokemon?.id }}
        </p>

        <!-- Main Image -->
        <img v-if="mainImage" :src="mainImage" :alt="store.pokemon?.name" class="w-56 h-56 object-contain" />

        <!-- Thumbnails -->
        <div v-if="thumbnails.length" class="flex gap-3 overflow-x-auto p-2">
          <img v-for="(img, i) in thumbnails" :key="i" :src="img"
            class="w-20 h-20 object-contain border rounded-lg p-1 cursor-pointer hover:scale-105 transition"
            @click="selectedImage = img" />
        </div>
        <!-- Types -->
        <div class="flex gap-2 mt-2">
          <span v-for="t in store.pokemon?.types" :key="t.type.name" class="badge badge-warning capitalize">
            {{ t.type.name }}
          </span>
        </div>
      </div>

      <!-- Info Grid -->
      <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="stat bg-base-200 rounded-xl p-4">
          <div class="stat-title">Boy</div>
          <div class="stat-value text-lg">
            {{ store.pokemon?.height ?? 0 / 10 }} m
          </div>
        </div>

        <div class="stat bg-base-200 rounded-xl p-4">
          <div class="stat-title">Kilo</div>
          <div class="stat-value text-lg">
            {{ store.pokemon?.weight ?? 0 / 10 }} kg
          </div>
        </div>

        <div class="stat bg-base-200 rounded-xl p-4">
          <div class="stat-title">Base Exp</div>
          <div class="stat-value text-lg">
            {{ store.pokemon?.base_experience }}
          </div>
        </div>

        <div class="stat bg-base-200 rounded-xl p-4">
          <div class="stat-title">Yakalama Oranı</div>
          <div class="stat-value text-lg">
            {{ store.captureRate }}
          </div>
        </div>
      </div>

      <!-- Abilities -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Yetenekler</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="a in store.pokemon?.abilities" :key="a.ability.name" class="badge badge-outline capitalize">
            {{ a.ability.name }}
          </span>
        </div>
      </div>

      <!-- Moves -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Hareketler (Moves)</h2>
        <div class="max-h-40 overflow-y-auto border rounded-lg p-3">
          <ul class="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <li v-for="m in store.pokemon?.moves.slice(0, 30)" :key="m.move.name" class="capitalize">
              {{ m.move.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">İstatistikler</h2>

        <div v-for="s in store.pokemon?.stats" :key="s.stat.name" class="mb-2">
          <div class="flex justify-between text-sm">
            <span class="capitalize">{{ s.stat.name }}</span>
            <span>{{ s.base_stat }}</span>
          </div>
          <progress class="progress progress-warning w-full" :value="s.base_stat" max="150"></progress>
        </div>
      </div>

      <!-- Evolution -->
      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Evrim Zinciri</h2>
        <div class="flex items-center gap-4">
          <template v-for="(e, i) in store.evolutionChain" :key="e.id">
            <div class="text-center">
              <img class="w-20 h-20 mx-auto"
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`" />
              <p class="text-sm capitalize">{{ e.name }}</p>
            </div>
            <span v-if="i < store.evolutionChain.length - 1">→</span>
          </template>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-8 flex justify-between items-center">
        <RouterLink to="/" class="btn btn-outline">← Geri</RouterLink>
        <button class="btn" :class="favStore.isFavorite(store.pokemon?.id??0)
          ? 'btn-warning'
          : 'btn-outline'" @click="favStore.toggleFavorite(store?.pokemon?.id??0)">
          <span v-if="favStore.isFavorite(store?.pokemon?.id??0)">⭐ Favorilerden Çıkar</span>
          <span v-else>☆ Favorilere Ekle</span>
        </button>
      </div>

    </div>
  </div>
</template>
