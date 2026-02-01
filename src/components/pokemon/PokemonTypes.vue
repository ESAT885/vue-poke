<script setup lang="ts">
import { pokemonTypes } from "@/constants/pokemonTypeColors.ts"

defineProps<{ types: string[] }>()

const getType = (type: string) =>
  pokemonTypes[type] ?? {
    label: type,
    class: 'bg-gray-100 text-gray-600',
  }
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 mt-2">
    <span
      v-for="t in types"
      :key="t"
      class="badge "
      :class="getType(t).class"
    >
      {{ getType(t).label }}
    </span>
  </div>
</template>
