<script setup lang="ts">
defineProps<{
  abilities?: {
    ability: {
      name: string
    }
  }[]
}>()
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Yetenekler</h2>

    <div class="flex flex-wrap gap-2">
      <span
        v-for="a in abilities"
        :key="a.ability.name"
        class="badge badge-outline capitalize"
      >
        {{ a.ability.name }}
      </span>
    </div>
  </div>
</template>
