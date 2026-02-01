<script setup lang="ts">
defineProps<{
  chain: {
    id: number
    name: string
  }[]
}>()
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Evrim Zinciri</h2>

    <div class="flex items-center gap-4">
      <template v-for="(e, i) in chain" :key="e.id">
        <div class="text-center">
          <img
            class="w-20 h-20 mx-auto"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${e.id}.png`"
          />
          <p class="text-sm capitalize">{{ e.name }}</p>
        </div>

        <span v-if="i < chain.length - 1">→</span>
      </template>
    </div>
  </div>
</template>
