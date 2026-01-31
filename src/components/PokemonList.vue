<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { usePokemonStore } from '@/stores/pokemonStore'


const store = usePokemonStore()
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null


onMounted(() => {
    store.loadPokemons()

    observer = new IntersectionObserver(
        entries => {
            if (entries[0]?.isIntersecting) {
                store.loadMorePokemons()
            }
        },
        {
            root: null,
            rootMargin: '200px',
            threshold: 0.1
        }
    )

    if (sentinel.value && observer) {
        observer.observe(sentinel.value)
    }
})


onBeforeUnmount(() => {
    if (observer && sentinel.value) {
        observer.unobserve(sentinel.value)
        observer.disconnect()
    }
})
</script>


<template>
    <div class="bg-base-200 p-6 min-h-screen overflow-y-auto md:overflow-visible">
        <!-- Search -->
        <input v-model="store.query" type="text" placeholder="Search pokemon..."
            class="border rounded px-3 py-2 mb-4 w-full" />


        <!-- Error -->
        <p v-if="store.error" class="text-red-500 mb-2">
            {{ store.error }}
        </p>


        <!-- List -->
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">

            <li v-for="p in store.filteredPokemons" :key="p.id" 
            class="group relative bg-base-100 rounded-2xl
         shadow-sm hover:shadow-2xl
         transition-all duration-300
         overflow-hidden p-3 sm:p-4">
                <!-- Hover Glow -->
                <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10
           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>

                <a :href="`/detail/${p.id}`" class="relative block">

                    <!-- Image -->
                    <div class="flex items-center justify-center py-4">
                        <img :src="p.image" :alt="p.name" class="w-24 h-24 sm:w-32 sm:h-32
               object-contain
               group-hover:scale-110
               transition-transform duration-300 ease-out" />
                    </div>

                    <!-- Content -->
                    <div class="text-center px-2 pb-2">
                        <h3 class="text-base sm:text-lg font-bold capitalize tracking-wide">
                            {{ p.name }}
                        </h3>

                        <!-- Types -->
                        <div class="flex flex-wrap justify-center gap-2 mt-2">
                            <span v-for="t in p.types" :key="t" class="text-[10px] sm:text-xs
                 px-3 py-1 rounded-full
                 bg-indigo-100 text-indigo-700
                 capitalize font-medium">
                                {{ t }}
                            </span>
                        </div>

                        <!-- ID -->
                        <p class="text-[10px] sm:text-xs text-gray-400 mt-3 tracking-wider">
                            #{{ p.id.toString().padStart(3, '0') }}
                        </p>
                    </div>

                </a>
            </li>
        </ul>


        <!-- Loading -->
        <p v-if="store.loading" class="mt-4">Loading...</p>


        <!-- Sentinel for infinite scroll -->
        <div ref="sentinel" class="h-32"></div>
    </div>
</template>